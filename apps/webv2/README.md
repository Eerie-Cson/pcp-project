# PC Builder Pro

A comprehensive PC building platform with real-time compatibility checking, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

### User Features
- **Component Browser**: Browse and search through extensive PC component catalog
- **Build Editor**: Interactive PC build creator with drag-and-drop component selection
- **Real-Time Compatibility Checking**: Instant validation of component compatibility
  - CPU/Motherboard socket matching
  - Memory type and capacity validation
  - GPU clearance vs case dimensions
  - Power supply wattage calculations
  - Form factor compatibility
- **Build Summary**: Live pricing and estimated power consumption
- **Save & Load Builds**: Persistent build storage with Zustand

### Admin Features
- **Component Management**: Full CRUD operations for all component types
  - CPUs
  - Motherboards
  - Memory (RAM)
  - Storage (SSD/HDD)
  - Video Cards (GPUs)
  - Cases
  - Power Supplies
- **Search & Filter**: Quick component lookup and filtering
- **Bulk Operations**: Efficient component management interface

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand (with persistence)
- **GraphQL Client**: urql (configured, using mock data)
- **Authentication**: Context-based auth with role-based routing

## Project Structure

\`\`\`
├── app/
│   ├── admin/              # Admin dashboard and component management
│   │   ├── cpus/
│   │   ├── motherboards/
│   │   ├── memory/
│   │   ├── storage/
│   │   ├── video-cards/
│   │   ├── cases/
│   │   └── power-supplies/
│   ├── builds/             # User build editor
│   ├── components/         # Component browser
│   ├── login/              # Authentication
│   └── page.tsx            # Landing page
├── components/
│   ├── admin/              # Admin-specific components
│   ├── auth/               # Authentication components
│   ├── navigation/         # Navigation components
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth/               # Authentication context
│   ├── compatibility/      # Compatibility checking engine
│   ├── graphql/            # GraphQL client, queries, mutations, types
│   ├── store/              # Zustand stores
│   └── mock-data.ts        # Mock component data
└── public/                 # Static assets and component images
\`\`\`

## Getting Started

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Authentication

The app uses a demo authentication system. Use any email/password to sign in as either:
- **User**: Access to component browser and build editor
- **Admin**: Access to component management dashboard

### Using the Build Editor

1. Sign in as a User
2. Navigate to "Build PC"
3. Select components for each category
4. View real-time compatibility warnings/errors
5. Monitor total price and estimated wattage
6. Save your build when complete

### Admin Component Management

1. Sign in as an Admin
2. Navigate to Admin Dashboard
3. Select a component type to manage
4. Use CRUD operations to manage components
5. Search and filter components efficiently

## Compatibility Rules

The compatibility engine validates:

1. **CPU/Motherboard**: Socket type must match
2. **Memory**: 
   - Type (DDR4/DDR5) must match motherboard
   - Total modules ≤ motherboard slots
   - Total capacity ≤ motherboard max memory
3. **GPU/Case**: GPU length ≤ case max GPU clearance
4. **Motherboard/Case**: Motherboard form factor supported by case
5. **Power Supply**: 
   - Wattage ≥ estimated system power draw
   - Warning if < recommended (with 20% headroom)

## GraphQL Integration

The app is configured to work with GraphQL endpoints. To connect to a real backend:

1. Set `NEXT_PUBLIC_GRAPHQL_ENDPOINT` environment variable
2. Update `lib/graphql/client.ts` with your endpoint
3. Replace mock data imports with actual GraphQL queries
4. Implement authentication mutations in `app/login/page.tsx`

### Available GraphQL Operations

See `lib/graphql/queries.ts` and `lib/graphql/mutations.ts` for all available operations including:
- Component queries (list and single)
- Component mutations (create, update, delete)
- Build operations
- Account management

## Customization

### Adding New Component Types

1. Add type definitions to `lib/graphql/types.ts`
2. Create queries/mutations in `lib/graphql/`
3. Add mock data to `lib/mock-data.ts`
4. Create admin page in `app/admin/[component-type]/`
5. Update compatibility checker if needed

### Styling

The app uses a dark theme with Tailwind CSS v4. Customize colors in `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: ...;
  --color-background: ...;
  /* etc */
}
\`\`\`

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy manually:

\`\`\`bash
npm run build
npm start
\`\`\`

## Future Enhancements

- [ ] Real GraphQL backend integration
- [ ] User profiles and saved builds
- [ ] Build sharing and community features
- [ ] Price tracking and alerts
- [ ] Performance benchmarking
- [ ] Component reviews and ratings
- [ ] Build templates and recommendations
- [ ] Export build to shopping cart

## License

MIT
