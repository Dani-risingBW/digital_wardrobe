# Outfitted

Outfitted is a local-first mobile wardrobe assistant for the digital closet, outfit builder, and AI recommender MVP.

## Current Slice

The first build includes:

- A mobile Expo shell using the Outfitted visual identity
- Local starter wardrobe data
- Individual clothing-photo selection
- AI-tag review before saving
- Category and multi-style-tag editing
- Private closet browsing and item deletion
- Local-only privacy screen

Firebase emulator wiring is configured in `firebase.json` and will be connected to the app in the next implementation slice.

## Development

Install dependencies and start Expo:

```bash
npm install
npm start
```

Run type checking:

```bash
npm run typecheck
```

The local Firebase Emulator Suite is configured for Auth, Firestore, Storage, Functions, and Emulator UI. It is intentionally not connected to a hosted Firebase project.

## Privacy Boundary

Wardrobe photos, metadata, location, and recommendation inputs must stay local during development. External data is limited to user-initiated shopping searches and product links. See `PRIVACY.md` and `DATABASE_STORAGE_DECISION.md` for the full rules.
