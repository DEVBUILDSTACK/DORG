# DORG - Learn2Launch Platform<<<<<<< HEAD

# DATDev, a Decensat iMPACT inspired "Fintech4All" participant team conpeting for engagement thru the Colosseum Fall 2025 Hackathon.

DATDev ("DAT" is the commonly used acronym for "Digital Asset Treasury") is the pre-formation project directed in accelerating the iMPACT objectives associated with Decensat.org and its affiliate 456iP SigLayer DebtVenture framework.

## Project Description

Project Description:

The DATDev Squad is the "L2Launchpad", inaugural 18+yr. old talent-squad building the L2L platform. Fast-track learning offering curated W3 Treasury tooling for SME's | solo-preneurs. Mentoring builder cohorts through proven curriculum and virtually delivered design thinking and creator cohort-based programming for youth.

Join our L2L Node at https://Lwandisurf.org Ponta Do Oura, Mozambique coming soon'26

Installation Instructions

## Project Structure

### Prerequisites

```

DORG/- Python 3.8+

├── frontend/          # Next.js frontend application- FastAPI

└── README.md         # This file- Docker (optional)

```

### Steps

## Getting Started

1. Clone the repository:

### Frontend (Next.js)   ```sh

   git clone https://github.com/DEVBUILDSTACK/DORG.git

Navigate to the frontend directory:   cd DORG

   ```

```bash

cd frontend2. Create a virtual environment and activate it:

npm install   ```sh

npm run dev   python -m venv env

```   source env/bin/activate  # On Windows use `env\Scripts\activate`

   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

3. Install the dependencies:

See [frontend/README.md](frontend/README.md) for more details.   ```sh

   pip install -r requirements.txt

## Contributing Guidelines   ```



We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for more details.4. Run the application:

   ```sh

## Contact Information   uvicorn app.main:app --reload

   ```

For any questions or suggestions, please contact us at [learn2launch@decensat.org](mailto:learn2launch@decensat.org).

## Usage Instructions

### Running Locally

1. Start the development server:
   ```sh
   uvicorn app.main:app --reload
   ```

2. Open your browser and go to `http://localhost:8000`.

### Docker

1. Build the Docker image:
   ```sh
   docker build -t dorg-squads .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 8000:8000 dorg-squads
   ```

## Contributing Guidelines

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) for more details.

## Contact Information

For any questions or suggestions, please contact us at [learn2launch@decensat.org](mailto:team@decensat.org).
```
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> origin/frontend
