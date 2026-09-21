# Database and Image Storage Decision

## Decision

Outfitted will use Firebase as its future backend platform, but local development will use the Firebase Local Emulator Suite. The local-only MVP must keep account data, wardrobe metadata, images, AI processing, and recommendations inside the local environment.

No wardrobe data, image, location, or recommendation input may be sent to a hosted Firebase project or external AI provider during local development. The only planned external-data exception is a user-initiated shopping search that returns external product links.

## Local Architecture

- Firebase Auth Emulator for local account and session flows
- Firestore Emulator for users, wardrobe items, outfits, feedback, and settings
- Cloud Storage Emulator for original images, processed images, and thumbnails
- Functions Emulator for image-processing and recommendation jobs
- Local rule-based or locally running AI for image tags and recommendations
- Local files or emulator export data for development backups

Google and Apple sign-in are future authentication options for a cloud-enabled phase. Local development should use emulator-compatible accounts or a local sign-in stub so authentication does not send identity data to an external provider.

## Option A: Individual Item Upload

The user adds one garment at a time:

1. Select or take one photo.
2. Process the image locally.
3. Detect the garment and generate draft tags.
4. Show the draft item for review.
5. Require confirmation before saving.
6. Save the item metadata and image versions in the local emulators.
7. Allow all tags and images to be edited or deleted later.

This flow provides the highest accuracy and the clearest correction experience. It should be the default onboarding flow for a first-time user.

## Option B: Batch Upload

The user selects multiple photos or takes several photos in one session:

1. Create a local upload session with a list of pending photos.
2. Process each photo independently.
3. Show item-level progress and errors.
4. Present draft items in a review queue.
5. Require confirmation for every item before saving it to the wardrobe.
6. Let the user edit tags individually or apply a tag to multiple selected items.
7. Save confirmed items and discard rejected drafts.

Batch upload should not silently save AI classifications. If one photo contains multiple garments, the user must confirm each detected item and may split or reject detections.

## Recommended Firestore Collections

- `users/{userId}`: profile, age confirmation, preferences, and consent settings
- `users/{userId}/wardrobeItems/{itemId}`: item metadata and image references
- `users/{userId}/outfits/{outfitId}`: saved outfits and selected items
- `users/{userId}/recommendations/{recommendationId}`: daily choices and explanations
- `users/{userId}/feedback/{feedbackId}`: required like/dislike and optional reasoning
- `users/{userId}/uploadSessions/{sessionId}`: local processing state and errors

Every document must be scoped by the authenticated local user ID. Storage paths should follow a structure such as `users/{userId}/wardrobe/{itemId}/original` and must not be publicly readable.

## MVP Clothing Categories

- Tops
- Bottoms
- Dresses
- Shoes
- Sleepwear
- Jackets
- Coats
- Sweaters
- Skirts

One item may have multiple style tags. Accessories and wardrobe status tracking are outside the MVP.

## Image Versions

Each item may have:

- Original image
- Background-removed image
- Thumbnail
- Optional locally blurred image

Temporary processing files should be deleted within 24 hours. Deleting an item must remove all active image versions and metadata. The local emulator export may retain development data until the developer deletes the export.

## Feedback and Recommendations

- Generate several owned-clothing outfit choices each day.
- Require a like or dislike response when a user rates a recommendation.
- Allow optional detailed reasoning after the required response.
- Keep recommendation inputs and feedback local.
- Use device location only inside the local AI recommender when permission is granted.
- Do not send location to a weather provider during the local-only phase.

## Cloud Migration Option

When the project is ready to leave local development, Firebase cloud services may be enabled:

- Firebase Authentication with Google and Apple providers
- Cloud Firestore
- Firebase Cloud Storage
- Cloud Functions

Cloud migration must not happen automatically. Before enabling it, decide the hosting region, vendor terms, retention rules, encryption configuration, AI provider, location behavior, user consent changes, and updated public Privacy Policy.

## Alternatives Considered

### SQLite and Local File Storage

Advantages:

- Fully local and simple for a single-device prototype
- No emulator setup
- Strong privacy boundary
- Low operating cost

Tradeoffs:

- Multi-user and authentication flows require more custom work
- Cloud migration would require a separate data migration
- Cross-device synchronization is not available

### Supabase Local Development

Advantages:

- PostgreSQL data model
- Local development options
- Authentication and object storage features

Tradeoffs:

- It would conflict with the selected Firebase backend direction
- Firebase-specific portfolio experience would be lost

### Firebase Local Emulator Suite

Advantages:

- Matches the planned future backend
- Supports local Auth, Firestore, Storage, and Functions behavior
- Keeps development data local
- Makes future cloud migration possible

Tradeoffs:

- Requires emulator setup and local Java tooling
- Google and Apple sign-in cannot be treated as live production providers locally
- Local data is not automatically synchronized across devices

## Final Recommendation

Use Firebase Local Emulator Suite for the portfolio MVP, with local emulator-compatible authentication and local image processing. Keep the data-access layer modular so SQLite or cloud Firebase can be substituted later without changing the mobile UI. Revisit cloud Firebase only after the privacy, budget, provider, and consent decisions are complete.
