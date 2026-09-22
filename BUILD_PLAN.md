# Outfitted MVP Build Plan

## Purpose

Build a local-first mobile portfolio application that helps users catalog their clothing, create outfits, and receive personalized recommendations. Implementation will begin only after this plan is approved.

## Scope Guardrails

- Mobile application using React Native with Expo and TypeScript.
- Firebase Local Emulator Suite for local Auth, Firestore, Storage, and Functions.
- No wardrobe data, images, location, or recommendation inputs leave the local environment.
- Local rules or locally running AI handle image analysis and recommendations.
- External data is permitted only for user-initiated shopping searches and external product links.
- MVP supports users age 13 and older.
- Accessories, social sharing, virtual try-on, calendar integrations, and public wardrobes are out of scope.
- Current development target is `$0` operating cost.

## Phase 1: Project Foundation

### Work

- Create the Expo React Native project.
- Configure TypeScript and strict type checking.
- Configure navigation and screen routing.
- Add linting, formatting, and test tooling.
- Add environment configuration for emulator endpoints.
- Configure Firebase Local Emulator Suite.
- Add local Auth, Firestore, Storage, and Functions configuration.
- Establish Outfitted design tokens using the terracotta and olive palette.
- Add a local-only privacy notice.

### Deliverables

- App launches on an emulator or supported device.
- Local Firebase services start with one documented command.
- Basic navigation shell exists.
- No production Firebase credentials are required.

### Approval Criteria

- The app launches successfully.
- Emulator services connect successfully.
- No network request sends wardrobe data outside the local environment.

## Phase 2: Authentication and User Setup

### Work

- Implement local account creation and sign-in.
- Add sign-out and session persistence.
- Require confirmation that the user is at least 13.
- Create private user profiles.
- Add style-preference onboarding.
- Add privacy and consent settings.
- Reserve Google and Apple sign-in interfaces for a future cloud-enabled phase.

### Deliverables

- Authenticated and unauthenticated navigation states.
- User profile document scoped to the local user ID.
- Style preferences stored locally.
- Minimum-age confirmation stored with the consent record.

### Approval Criteria

- Users can create separate accounts.
- One account cannot access another account's data.
- Users under the minimum age cannot continue.

## Phase 3: Digital Wardrobe Uploads

### Work

- Implement individual clothing-photo upload.
- Implement batch photo upload.
- Support photos containing multiple items through item-level review.
- Store images in the local Storage Emulator.
- Generate local thumbnails and processed image versions.
- Add upload progress, errors, retry, and cancellation.
- Add these MVP categories:
  - Tops
  - Bottoms
  - Dresses
  - Shoes
  - Sleepwear
  - Jackets
  - Coats
  - Sweaters
  - Skirts
- Support multiple style tags on one item.
- Do not track laundry, condition, or availability.

### Individual Upload Flow

1. User selects or takes one photo.
2. The image is processed locally.
3. Local AI or rules generate draft tags.
4. The user reviews the draft item.
5. The user confirms or edits the tags.
6. The confirmed item is saved to the local wardrobe.

### Batch Upload Flow

1. User selects multiple photos.
2. The app creates a local upload session.
3. Photos are processed independently.
4. Each draft item appears in a review queue.
5. The user confirms, edits, splits, or rejects each item.
6. Only confirmed items are saved.

### Approval Criteria

- A user can add a clothing item from a photo.
- AI tags are never saved without review.
- Users can edit tags after saving.
- Batch failures do not lose successfully processed items.
- Users can delete an item and all related image versions.

## Phase 4: Closet Browsing and Management

### Work

- Build a visual closet grid.
- Add category filters.
- Add style-tag filters.
- Add color and text search.
- Add item detail screens.
- Add edit and delete actions.
- Add empty states and onboarding guidance.
- Enforce user-level Firestore and Storage access rules.

### Approval Criteria

- Users can browse their closet visually.
- Users can find items quickly using filters.
- Users only see their own wardrobe.
- Deleted items no longer appear in the closet or recommendations.

## Phase 5: Outfit Builder

### Work

- Pair tops, bottoms, dresses, jackets, coats, shoes, and sleepwear.
- Exclude accessories from the MVP.
- Add outfit compatibility rules.
- Add color, style, season, and formality checks.
- Allow users to save complete outfits.
- Allow users to edit and delete saved outfits.
- Show the selected style tags and explanation.

### Approval Criteria

- Users can create an outfit from owned items.
- The app prevents invalid or incomplete combinations where appropriate.
- Users can save, edit, and delete outfits.
- Outfit data remains private to its owner.

## Phase 6: Local AI Recommender

### Work

- Generate several owned-clothing outfit choices each day.
- Use local rules and locally running AI only.
- Consider style preferences, colors, season, occasion, dress code, and outfit variety.
- Use device location only after permission is granted.
- Keep location and recommendation inputs local.
- Do not use an external weather API during the local-only phase.
- Explain why each outfit was recommended.
- Require a like or dislike response.
- Allow optional detailed feedback.
- Learn from feedback without sending it externally.

### Approval Criteria

- Users receive several recommendation choices.
- Recommendations use owned items only.
- Each recommendation has an understandable explanation.
- Users must select like or dislike before submitting feedback.
- Detailed feedback is optional.
- Recommendations can be regenerated without external AI calls.

## Phase 7: Shopping Search

### Work

- Add a separate shopping-search screen.
- Allow users to search for specific pieces.
- Support external search results and product links.
- Keep shopping results separate from owned-clothing recommendations.
- Clearly indicate when the user is leaving the app.
- Send only the user-entered shopping query and necessary search parameters externally.
- Never send wardrobe images or private wardrobe metadata to shopping providers.

### Approval Criteria

- Shopping search is initiated by an explicit user action.
- External results do not receive private wardrobe data.
- Users can open product links safely.
- Shopping features do not change the wardrobe without user confirmation.

## Phase 8: Privacy Controls and Data Lifecycle

### Work

- Add image-processing consent.
- Add AI-personalization toggle.
- Add analytics toggle.
- Keep AI-training consent off by default.
- Add image deletion.
- Add clothing-item deletion.
- Add recommendation-history deletion.
- Add account deletion.
- Add local data export.
- Add temporary-file cleanup.
- Add local privacy and retention documentation.

### Approval Criteria

- Users can control optional data uses.
- Users can delete individual images and clothing items.
- Account deletion removes active local data.
- Temporary processing files are removed within 24 hours.
- Exported data is authenticated and expires after 72 hours.
- Privacy behavior matches `PRIVACY.md`.

## Phase 9: Testing and Hardening

### Work

- Test authentication and user isolation.
- Test Firestore and Storage security rules.
- Test individual and batch uploads.
- Test AI-tag review requirements.
- Test item and image deletion.
- Test recommendation feedback.
- Test local-only network boundaries.
- Test shopping-search data boundaries.
- Test account deletion and data export.
- Test mobile layouts and accessibility.
- Test emulator reset and seed-data workflows.

### Approval Criteria

- Critical privacy workflows have automated tests.
- Cross-user access tests fail safely.
- Local development can be reset without stale user data.
- The app works on the selected iOS and Android test targets.

## Phase 10: Portfolio Presentation

### Work

- Write the project README.
- Document local setup and emulator commands.
- Add architecture and data-flow diagrams.
- Add screenshots or a demo video.
- Add sample wardrobe seed data.
- Document privacy and local-first decisions.
- Document known limitations and deferred features.
- Add a portfolio case study describing the design and engineering decisions.

### Approval Criteria

- A new developer can run the app locally from the README.
- The privacy boundary is clearly documented.
- The project demonstrates the MVP end to end.
- Known limitations and future cloud migration work are explicit.

## First Build Milestone

The first implementation milestone is:

> A local mobile app where a user can create an account, upload one clothing item, review its tags, save it to a private closet, edit it, and delete it.

## Approval Gate

Implementation should begin only after approval of this plan. Scope changes should be recorded in `PLAN.md` or this document before they are implemented.
