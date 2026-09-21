# What Should I Wear?

## Product Vision

Create a digital wardrobe and AI styling assistant that helps users decide what to wear every day. Users can photograph or upload clothing, turn it into a searchable digital wardrobe, build outfits, and receive recommendations based on their wardrobe, preferences, weather, occasions, learned behavior, and current fashion trends.

## Core Features

- Photograph or upload clothing items.
- Remove image backgrounds and identify garments automatically.
- Store clothing categories, colors, patterns, materials, fit, season, and formality.
- Browse and search a visual digital closet.
- Pair tops, bottoms, dresses, outerwear, shoes, and accessories.
- Build and save complete outfits.
- Recommend daily outfits using the user's own clothing.
- Learn from likes, dislikes, skips, edits, and outfits marked as worn.
- Support style directions such as streetwear, Y2K, country, athleisure, chic, casual, formal, and business professional.
- Consider weather, season, occasion, dress code, clothing availability, and recent outfit history.

## Recommended MVP

The first release should include:

- Private user accounts and wardrobes.
- Individual and batch clothing uploads.
- AI-generated clothing tags with manual correction.
- A visual closet organized by category.
- Basic search and filters.
- A simple outfit builder.
- Style preference onboarding.
- Recommendations based only on owned clothing.
- Like, dislike, skip, and worn feedback.
- Weather-aware recommendations.

Delay trend discovery, social sharing, shopping recommendations, calendar integrations, virtual try-on, and community features until the core wardrobe experience is useful.

## Product Decisions

- Choose whether the first version is a mobile app, web app, or both.
- Decide whether users upload individual item photos, closet batches, or both.
- Decide whether photos containing multiple items are supported.
- Decide whether users confirm every AI classification or only corrections.
- Allow users to create an item manually when a photo is unavailable.
- Decide whether recommendations may include items the user does not own.
- Decide how much control users have over style preferences.
- Support optional preferences for modesty, cultural requirements, religious requirements, gender expression, and comfort.
- Decide whether the wardrobe tracks size, fit, condition, laundry status, and availability.
- Decide whether recommendations should prevent frequent outfit repetition.
- Decide which style categories are supported in the MVP.

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
- Condition and availability
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

- Weather and temperature
- Rain, snow, and wind
- Selected occasion
- Work or school dress code
- Preferred styles and colors
- Items worn recently
- Clean and available items
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
- Make the experience mobile-friendly.
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

## Suggested Technical Architecture

- Frontend: mobile-first web app or React Native
- Backend: authenticated API service
- Database: PostgreSQL
- Image storage: S3-compatible object storage
- Image pipeline: resizing, background removal, and thumbnail generation
- AI services: vision model for classification and tagging
- Recommendation engine: rules plus behavioral ranking
- Background jobs: asynchronous image processing and recommendation generation
- Weather integration: weather API using an optional user location
- Analytics: privacy-conscious product analytics

## Core Screens

- Welcome and style onboarding
- Add clothing
- Image-processing status
- Closet grid
- Item detail and editing
- Outfit builder
- Daily recommendation
- Recommendation explanation
- Outfit history
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

## Major Risks

- AI misidentifies clothing or colors.
- Cataloging takes too long and causes abandonment.
- Recommendations become repetitive.
- Trend recommendations become inaccurate or culturally insensitive.
- Image processing becomes expensive.
- Users do not trust the application with personal photos.
- Large wardrobes become difficult to manage.
- Fashion compatibility is subjective and difficult to measure.
- Recommendations ignore laundry status, damage, comfort, or fit.

## Development Phases

1. Define the target user, platform, and MVP style categories.
2. Design the wardrobe and outfit data model.
3. Build manual upload and closet browsing.
4. Add AI tagging with manual correction.
5. Build outfit pairing rules.
6. Add personalized recommendations and feedback.
7. Add weather and occasion context.
8. Add trend-based styling.
9. Test with a small group of users.
10. Improve recommendation quality using real behavior.

## Decisions Required Before Development

- Target audience
- Mobile app versus web app
- First supported style categories
- Single-user or multi-user support
- Privacy policy and image-retention rules
- AI provider and operating budget
- Owned-clothing-only recommendations versus shopping suggestions
- Whether location and weather are required
- Whether accessories are part of the MVP
- Product name and visual identity
- Prototype, portfolio project, or production-ready scope

## Product Principle

Start with a private, mobile-friendly wardrobe catalog that has reliable tagging, easy corrections, a simple outfit builder, and recommendations based on the user's own clothes. Add trend intelligence and virtual try-on only after the core wardrobe experience is useful and trusted.
