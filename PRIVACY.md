# Privacy Controls and Data Policy

This document defines the privacy behavior for Outfitted. It is an implementation specification and policy draft, not legal advice. A qualified privacy attorney should review the final public policy before launch.

## Privacy Defaults

- Wardrobes are private by default.
- A user's wardrobe is isolated from every other user's wardrobe.
- Wardrobe photos are never public unless a future sharing feature receives separate consent.
- User photos are not used to train general-purpose AI models unless the user explicitly opts in.
- Exact GPS coordinates are not stored by default.
- Location and weather are used only by the AI recommender.
- The local-development MVP keeps wardrobe data, images, location, and recommendation inputs inside the local environment.
- The only external-data exception is a user-initiated shopping search and its external product links.
- Optional analytics and AI-training consent are separate from consent required to use the wardrobe.
- Users can delete individual images, clothing items, history, or their entire account.

## Data Categories

### Account Data

- Email address and authentication identifiers
- Display name, if provided
- Account age or age-range confirmation where required
- Consent and privacy-setting history

### Wardrobe Data

- Original clothing photos
- Processed clothing photos and thumbnails
- Clothing category, color, pattern, material, fit, size, brand, and style tags
- User notes

### Recommendation Data

- Style preferences
- Required outfit likes/dislikes, optional detailed reasoning, edits, saves, and outfit history
- Selected occasions and dress-code preferences
- Recommendation explanations and feedback

### Optional Context Data

- User-selected city, ZIP code, or approximate location
- Weather response used to generate a recommendation
- Shopping searches and selected product links

## Purpose Limitation

Each data category must have a documented purpose:

- Wardrobe images are used to create and display digital wardrobe items.
- Wardrobe metadata is used for closet search, outfit pairing, and recommendations.
- Feedback is used to personalize future recommendations.
- Approximate location is used only to obtain weather context for the AI recommender.
- Shopping searches are used to return shopping results and are not used to add items to the wardrobe automatically.
- Technical logs are used for security, debugging, and reliability.

Data must not be reused for advertising, sale, public profiles, or unrelated model training without separate disclosure and consent.

## Consent Controls

The app should show separate controls for:

- Required account and wardrobe processing
- Optional AI personalization
- Optional product analytics
- Optional use of de-identified data for improving the app
- Optional use of images or wardrobe data for AI training
- Weather-aware recommendations and location access

Consent records should include the setting, version of the policy shown, timestamp, and whether the user granted or withdrew consent. Withdrawing optional consent must not delete the user's wardrobe or block core wardrobe features.

## Settings Screen

The Privacy section should include:

- `Private wardrobe`: always enabled and not user-toggleable in the MVP
- `AI personalization`: on/off
- `Product analytics`: on/off
- `Improve Outfitted with de-identified data`: on/off
- `Use my images for AI training`: off by default
- `Weather-aware recommendations`: on/off
- `Location permission`: system permission plus an in-app status
- `Download my data`: export request action
- `Delete selected wardrobe items`: item-level deletion action
- `Delete account`: destructive action requiring confirmation
- Links to the Privacy Policy and Terms of Service

Every optional setting should explain its effect in plain language. Settings must be available without contacting support.

## Image Processing Rules

The image pipeline may create an original image, a background-removed image, and thumbnails. It must:

- Show processing status to the user.
- Delete temporary processing files within 24 hours.
- Restrict image access to the owning user and authorized processing services.
- Avoid facial recognition.
- Provide optional face and background blurring.
- Record which image versions exist for each wardrobe item.
- Allow the original image to be deleted while retaining a processed image if the user chooses.
- Delete all image versions when the related wardrobe item is deleted.

Third-party AI services must receive only the minimum image and metadata needed for the requested operation. Vendor contracts and settings must prohibit provider training on user images unless the user has explicitly opted in.

## Retention Schedule

| Data | Default retention | User control |
| --- | --- | --- |
| Original wardrobe photo | While the item exists | Delete or replace immediately |
| Processed wardrobe image | While the item exists | Delete with item |
| Thumbnail | While the item exists | Delete with item |
| Temporary processing file | Up to 24 hours | Not user-visible |
| Clothing metadata | While the item exists | Edit or delete immediately |
| Outfit history | Until user deletes it or deletes the account | Delete history |
| Recommendation feedback | Until user deletes it or disables personalization | Delete history or disable personalization |
| Shopping search history | 30 days by default | Clear immediately |
| Exact location | Not stored by default | No retention |
| Approximate weather context | With recommendation history only | Delete recommendation history |
| Security and audit logs | Up to 12 months, subject to legal and security needs | Access restricted |
| Deleted active data in backups | Up to 60 days | Removed automatically as backups expire |

Retention periods must be configurable on the server and covered by automated deletion jobs. The application must not claim immediate deletion if encrypted backups can retain copies temporarily.

## Delete Flows

### Delete an Image

1. Confirm that the requesting user owns the image.
2. Remove the original image from active storage.
3. Remove processed variants and thumbnails when requested.
4. Remove image references from the wardrobe item.
5. Record a deletion event without retaining the image contents.

### Delete a Wardrobe Item

1. Mark the item as pending deletion so it disappears from the user's closet.
2. Remove image files and metadata from active systems.
3. Remove the item from saved outfits and recommendations.
4. Allow backup cleanup to complete within the stated backup-retention window.

### Delete an Account

1. Require recent authentication and explicit confirmation.
2. Immediately disable sign-in and hide the user's data.
3. Queue all account-owned images, metadata, feedback, and history for deletion.
4. Remove active account data within 30 days.
5. Remove remaining encrypted-backup copies within 60 days.
6. Retain only the minimum deletion and security audit record required to demonstrate completion.

Deletion jobs must be retryable, idempotent, and observable without exposing private image data.

## Data Export

An export should include:

- Wardrobe metadata in JSON or CSV
- Outfit and recommendation history
- Consent and privacy-setting history
- Original and processed images in a downloadable archive, if the user requests them

Exports should be generated asynchronously, expire after 72 hours, and require authenticated access. Export links must not be guessable or shareable by default.

## Location and Weather

- Ask for location permission only when the user enables weather-aware recommendations.
- Prefer a manually selected city or ZIP code over exact device coordinates.
- Send the minimum location precision needed to obtain weather.
- Do not retain exact coordinates by default.
- Let users turn off weather-aware recommendations and manually select a location.
- Explain that location affects only the AI recommender.

## Multi-User Authorization

Every wardrobe, image, outfit, export, and deletion request must be authorized against the authenticated user's ID. Backend queries must scope records by user ID. Object-storage URLs should be private and short-lived. Administrative access should be limited, logged, and used only for support or security purposes.

## Third-Party Providers

Maintain a vendor list covering:

- Authentication provider
- Image storage provider
- Image-processing provider
- AI vision or recommendation provider
- Weather provider
- Shopping-search provider
- Analytics provider

For every vendor, document the data shared, purpose, retention behavior, security terms, and whether the vendor uses data for model training. The public Privacy Policy should link to the current vendor list.

## Required Acceptance Criteria

- Account creation requires confirmation that the user is at least 13.
- A new wardrobe is private and cannot be accessed by another account.
- Image-processing consent is shown before the first upload.
- AI-training consent is off by default.
- Exact location is not persisted by default.
- Weather context is used only by the AI recommender.
- A user can delete an image without contacting support.
- A user can delete a wardrobe item and its image variants.
- A user can request and download an export.
- Account deletion disables access immediately and completes active-data deletion within 30 days.
- Temporary image files are removed within 24 hours.
- Optional consent can be withdrawn without deleting the wardrobe.
- Privacy settings and consent changes are audited.
- Automated tests cover authorization, export access, deletion, retention, and cross-user isolation.

## Public Policy Summary

The eventual public policy should explain, in plain language, what is collected, why it is collected, how long it is retained, which providers process it, how optional consent works, and how users can export or delete their data. It should not promise immediate deletion when encrypted backups have a documented retention period.
