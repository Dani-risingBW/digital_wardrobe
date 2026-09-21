# What Should I Wear?

## Product Vision

Create a digital wardrobe and AI styling assistant that helps users decide what to wear every day. Users can photograph or upload clothing, turn it into a searchable digital wardrobe, build outfits, and receive recommendations based on their wardrobe, preferences, weather, occasions, learned behavior, and current fashion trends.

## Target Audience and Scope

- Primary audience: young adults from their late teens through their thirties.
- Platform: mobile application.
- Account model: multi-user support with private wardrobes for each user.
- Project type: portfolio project.
- Product name: Outfitted.
- Visual identity: terracotta and olive color palette (warm, earthy, grounded), with a hanger-and-thread wordmark and icon.

## Core Features

- Photograph or upload clothing items.
- Remove image backgrounds and identify garments automatically.
- Store clothing categories, colors, patterns, materials, fit, season, and formality.
- Browse and search a visual digital closet.
- Pair tops, bottoms, dresses, outerwear, and shoes.
- Build and save complete outfits.
- Recommend daily outfits using the user's own clothing.
- Learn from required likes/dislikes and optional detailed feedback.
- Support athletic, formal, business professional, casual, streetwear, and sleepwear styles.
- Consider weather, season, occasion, dress code, and recent outfit history.

## Recommended MVP

The first release should include:

- Multi-user accounts with private wardrobes.
- Individual and batch clothing uploads.
- AI-generated clothing tags with manual correction.
- A visual closet organized by category.
- Basic search and filters.
- A simple outfit builder.
- Style preference onboarding.
- Recommendations based only on owned clothing.
- Required like/dislike feedback with optional detailed reasoning.
- Several daily recommendation choices.
- Device location permission available to the local AI recommender.
- A shopping section with a search bar for finding specific items not currently owned.

Delay trend discovery, social sharing, calendar integrations, virtual try-on, accessories, and community features until the core wardrobe experience is useful. Shopping search is part of the MVP, but shopping results should remain separate from owned-clothing outfit recommendations.

## Product Decisions

- Build the first version as a mobile app.
- Support both individual item photos and batch uploads.
- Allow photos containing multiple items when the user confirms each detected item.
- Require users to review AI classifications before saving and allow edits later.
- Allow users to create an item manually when a photo is unavailable.
- Keep outfit recommendations focused on clothing the user owns.
- Decide how much control users have over style preferences.
- Support optional preferences for modesty, cultural requirements, religious requirements, gender expression, and comfort.
- Track size and fit, but do not track wardrobe condition, laundry status, or availability.
- Recommendations should provide several choices each day.
- Support athletic, formal, business professional, casual, streetwear, and sleepwear in the MVP.
- Keep accessories out of the MVP.
- Include shopping search as a separate section for specific item discovery.
- Use location and weather only as inputs to the AI recommender.
- Treat multi-user support as a core requirement.
- Scope the application as a portfolio project.
- Name the product Outfitted, with a terracotta and olive visual identity.
- Support Google and Apple sign-in when cloud authentication is enabled.
- Use Firebase Emulator Suite for local-only development.
- Keep wardrobe data, images, AI processing, and recommendations inside the local environment for now.
- Allow external data to leave the local environment only for user-initiated shopping searches and external product links.

## Product Name and Visual Identity

- Product name: Outfitted.
- Color palette: terracotta and olive, warm and earthy in tone.
  - Terracotta #C96F4A — primary accent, used for the single primary action per screen (for example, the "wear this" button).
  - Olive #6B7052 — secondary supporting color.
  - Dusty rose #D9A79C — light accent for tags, chips, and highlights.
  - Cream #F4EDE2 — background and card surfaces.
  - Charcoal #2B2A28 — primary text and dark accents.
- Logo mark: a minimalist hanger-and-thread icon, paired with the "outfitted" wordmark set in sentence case.
- App icon: the hanger mark on a solid terracotta, olive, or charcoal rounded square, for use across icon sizes.
- Brand tone: warm, grounded, and approachable rather than clinical or trend-chasing, matching a target audience that spans late teens through thirties.

## Wardrobe Data Model

Each clothing item should support:

- Category and subcategory
- Primary and secondary colors
- Pattern and texture
- Material
- Fit and silhouette
- Formality level
- Season and weather suitability
- Style tags
- Brand and size
- User notes
- Original and processed images

Each outfit should store:

- Items used
- Style category
- Occasion
- Weather conditions
- User rating
- Date worn
- Recommendation source
- User modifications

## AI Strategy

Use AI for background removal, item detection, clothing classification, color and pattern extraction, style tagging, compatibility scoring, and recommendation ranking.

Use a hybrid recommendation system:

- Rules prevent unsuitable combinations.
- Compatibility logic handles color, weather, formality, layering, and item categories.
- Behavioral ranking learns from likes, dislikes, skips, wears, and edits.
- Trend data adds current styles without overriding user preferences.

AI output should never be treated as permanent without user control. Users must be able to correct categories, colors, styles, seasons, formality, and availability.

## Recommendation Inputs

Daily recommendations may use:

- Weather and temperature, used only by the AI recommender
- Rain, snow, and wind, used only by the AI recommender
- User location, used only by the AI recommender
- Selected occasion
- Work or school dress code
- Preferred styles and colors
- Items worn recently
- Seasonality
- Outfit variety
- User feedback

Each recommendation should explain its reasoning, such as: “Recommended because it is warm enough for today, matches your chic preference, and uses pants you have not worn recently.”

## Usability Requirements

- Uploading must be quick and forgiving of imperfect photos.
- Support batch uploads.
- Show image-processing progress.
- Make AI corrections fast and easy.
- Use visual browsing for the closet.
- Keep filters simple and useful.
- Make outfit creation require very few taps.
- Let users reject recommendations without explaining why.
- Make the experience mobile-first and optimized for a mobile app.
- Provide useful empty states for new users.
- Keep the app useful with a small wardrobe.

## Privacy and Security

Clothing photos may reveal a user's body, home, location, or other personal information. The application should provide:

- Private-by-default wardrobes
- Clear consent for photo processing
- Encryption in transit and at rest
- Secure image storage
- Account deletion that removes uploaded images
- No training on user images without explicit consent
- Disclosure of third-party AI providers
- Optional face and background blurring
- Minimal personal-data collection
- Export and deletion controls

Detailed privacy behavior, retention periods, consent settings, deletion flows, export requirements, and acceptance criteria are defined in [`PRIVACY.md`](PRIVACY.md).

## Suggested Technical Architecture

- Frontend: React Native or another mobile application framework
- Backend: Firebase, using the Firebase Local Emulator Suite during local development
- Database: Firestore Emulator locally, with Cloud Firestore as a future option
- Image storage: Cloud Storage Emulator locally, with Firebase Cloud Storage as a future option
- Image pipeline: resizing, background removal, and thumbnail generation
- AI services: local vision model or local processing for classification and tagging
- Recommendation engine: rules plus behavioral ranking
- Background jobs: asynchronous image processing and recommendation generation
- Location integration: device location permission is available to the local AI recommender; no location is sent to an external weather service in the local-only MVP
- Analytics: privacy-conscious product analytics

Firebase is the selected backend platform for the cloud-ready architecture. During local development, use the Firebase Local Emulator Suite so authentication, Firestore, Cloud Storage, and Cloud Functions data remain local. Cloud Firebase services are deferred until the privacy model and deployment decision are revisited.

## Operating Budget Targets

- Current phase: local development with a target operating cost of `$0`.
- Small demo phase: target `$0-$25` per month.
- Small test group: target `$25-$100` per month.
- Larger public application: expect costs to scale based on usage and potentially reach hundreds or thousands of dollars per month.
- Control costs by limiting image size, processing each image once, caching AI results, and using rule-based recommendations whenever possible.
- Choose AI and infrastructure providers based on cost, privacy, speed, model quality, and how user images are handled.

## Core Screens

- Welcome and style onboarding
- Add clothing
- Image-processing status
- Closet grid
- Item detail and editing
- Outfit builder
- Daily recommendations with several choices
- Recommendation explanation
- Outfit history
- Shopping search
- Preferences and privacy settings

## Success Metrics

- Users who add their first item
- Items added per user
- AI classification correction rate
- Recommendation click-through rate
- Like, dislike, and skip ratios
- Outfits saved
- Outfits marked as worn
- Seven-day and thirty-day retention
- Time required to create an outfit
- Recommendation rejection reasons
- Closet browsing frequency
- Required like/dislike response rate

## Major Risks

- AI misidentifies clothing or colors.
- Cataloging takes too long and causes abandonment.
- Recommendations become repetitive.
- Trend recommendations become inaccurate or culturally insensitive.
- Image processing becomes expensive.
- Strict local-only processing limits live weather and external AI integrations.
- Users do not trust the application with personal photos.
- Large wardrobes become difficult to manage.
- Fashion compatibility is subjective and difficult to measure.
- Recommendations ignore laundry status, damage, comfort, or fit.

## Development Phases

1. Define the young-adult user experience, mobile platform, and MVP style categories.
2. Design the wardrobe and outfit data model.
3. Build manual upload and closet browsing.
4. Add AI tagging with manual correction.
5. Build outfit pairing rules.
6. Add personalized recommendations and feedback.
7. Add device location context to the local AI recommender without sending location externally.
8. Add trend-based styling.
9. Test with a small group of users.
10. Improve recommendation quality using real behavior.

## Confirmed Decisions

- Target audience: young adults from their late teens through their thirties.
- Platform: mobile app.
- Supported MVP styles: athletic, formal, business professional, casual, streetwear, and sleepwear.
- Account model: multi-user support with private wardrobes.
- Authentication: Firebase Auth Emulator locally, with Google and Apple sign-in planned for a future cloud-enabled phase.
- Database and storage: Firebase Emulator Suite locally; cloud Firebase remains a future option.
- Privacy policy and image-retention rules: strict local-only processing for now.
- AI provider: local AI or local rule-based processing during development; no wardrobe data or images sent to external AI providers.
- Operating budget: local development now, with future targets of `$0-$25` per month for a small demo and `$25-$100` per month for a small test group.
- Recommendations: several choices each day with required like/dislike feedback and optional detailed reasoning.
- Recommendations: primarily owned-clothing-only.
- Shopping: separate item-search section with a search bar and external links in results.
- Location: device permission may be used locally by the AI recommender.
- MVP categories: tops, bottoms, dresses, shoes, sleepwear, jackets, coats, sweaters, and skirts.
- Style tags: one item may have multiple style tags.
- Wardrobe status: not tracked.
- Uploads: support individual and batch flows; review AI tags before saving and edit them later.
- Accessories: excluded from the MVP.
- Minimum age: 13.
- Data boundary: no data leaves the local environment except user-initiated shopping searches and external shopping links.
- Product name: Outfitted.
- Visual identity: terracotta and olive palette with a hanger-and-thread mark.
- Scope: portfolio project.

## Product Principle

Start with a private, mobile wardrobe catalog that has reliable tagging, easy corrections, a simple outfit builder, and recommendations based on the user's own clothes. Keep shopping search separate from outfit recommendations. Add trend intelligence, accessories, and virtual try-on only after the core wardrobe experience is useful and trusted.
