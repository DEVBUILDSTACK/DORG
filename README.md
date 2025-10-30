# DORG - Learn2Launch Platform

DATDev ("Digital Asset Treasury") is a pre-formation project accelerating the iMPACT objectives associated with Decensat.org and its affiliate 456iP SigLayer DebtVenture framework.

## Project Overview

The DATDev Squad powers "L2Launchpad", a comprehensive platform for 18+ year-old builders learning Web3 Treasury tooling. Our platform bridges the gap between traditional finance and Web3 technologies through innovative solutions and educational resources.

### Core Objectives
- Empowering SMEs and solo-preneurs with Web3 treasury management tools
- Building a community-driven learning ecosystem for blockchain development
- Providing hands-on experience with DeFi and treasury management
- Facilitating mentor-mentee relationships in the Web3 space

### Key Components
1. **Builder Marketplace**
   - Project acceleration and incubation
   - Resource allocation and management
   - Community-driven development support

2. **Learning Platform**
   - Curated W3 Treasury tooling curriculum
   - Interactive coding exercises
   - Real-world project implementation
   - Peer learning opportunities

3. **Treasury Solutions**
   - Multi-chain Solana synthetic "DATproxy" Vault allocation
   - Risk management frameworks
   - Automated treasury operations
   - Cross-chain asset management

## Technical Architecture

### Project Structure
```
DORG/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/      # Next.js 13+ app directory with route groups
│   │   │   ├── (auth)/       # Authentication routes
│   │   │   ├── (fundio)/     # Main application routes
│   │   │   ├── (landing-page)/ # Public landing pages
│   │   │   └── dashboard/    # User dashboards
│   │   ├── components/   # React components
│   │   │   ├── features/ # Feature-specific components
│   │   │   ├── landing/  # Landing page components
│   │   │   └── ui/       # Reusable UI components
│   │   ├── lib/      # Core utilities and configurations
│   │   │   ├── api/     # API integration layers
│   │   │   ├── fundio/  # Treasury management logic
│   │   │   └── wagmi.ts # Web3 configuration
│   │   └── types/    # TypeScript type definitions
├── backend/          # Python FastAPI backend service
│   ├── app/         # Application core
│   │   ├── api/     # API endpoints
│   │   ├── models/  # Data models
│   │   └── services/ # Business logic
└── vaults/          # Smart contract implementations
    ├── base_vault/  # Base vault implementation
    │   ├── src/     # Contract source code
    │   └── test/    # Contract tests
    └── sol_vault/   # Solana-specific vault
        ├── programs/ # Solana programs
        └── tests/   # Integration tests
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS, Mantine UI
- **Web3**: Wagmi, Privy for wallet integration

#### Backend
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Database**: PostgreSQL
- **API Documentation**: OpenAPI (Swagger)

#### Smart Contracts
- **Networks**: Solana, Ethereum
- **Tools**: Foundry, Anchor Framework
- **Testing**: Forge, Jest

### Prerequisites

#### Development Environment
- Node.js 18+
- Python 3.8+
- Solana CLI tools
- Rust (for Solana development)
- PostgreSQL 14+
- Redis 6+

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Configure required environment variables

4. Start the development server:
   ```bash
   npm run dev
   ```

   Access the application at [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python main.py
   ```

### Smart Contract Development

1. Navigate to vault directory:
   ```bash
   cd vaults/base_vault
   ```

2. Install Foundry dependencies:
   ```bash
   forge install
   ```

3. Run tests:
   ```bash
   forge test
   ```

### Frontend Deployment
1. **Production Deployment**
   ```bash
   npm run build
   npm run start
   ```
   - Automatic deployments via Vercel
   - Branch previews for pull requests
   - Custom domain configuration

2. **Environment Configuration**
   - Set up environment variables
   - Configure CDN settings
   - Enable logging and monitoring

### Backend Deployment
1. **Container Setup**
   ```bash
   docker build -t dorg-backend .
   docker-compose up -d
   ```

2. **Database Migration**
   ```bash
   alembic upgrade head
   ```

### Smart Contract Deployment

#### Ethereum Contracts
```bash
cd vaults/base_vault
forge script script/Deploy.s.sol \
  --rpc-url $RPC_URL \
  --private-key $PRIVATE_KEY \
  --broadcast \
  --verify
```

#### Solana Programs
```bash
cd vaults/sol_vault
anchor build
anchor deploy
```

## Contact

For any questions or suggestions, contact us at:
- Email: learn2launch@decensat.org
- Website: https://Lwandisurf.org (Coming 2026)
- Discord: [Join our community](https://discord.gg/learn2launch)
- Twitter: [@Learn2Launch](https://twitter.com/Learn2Launch)

## License

Copyright © 2025 DATDev. All rights reserved.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
