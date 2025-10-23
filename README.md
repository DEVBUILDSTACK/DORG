# DATDev, a Decensat iMPACT inspired "Fintech4All" participant team conpeting for engagement thru the Colosseum Fall 2025 Hackathon.

DATDev ("DAT" is the commonly used acronym for "Digital Asset Treasury") is the pre-formation project directed in accelerating the iMPACT objectives associated with Decensat.org and its affiliate 456iP SigLayer DebtVenture framework.

Project Description:

The DATDev Squad is the "L2Launchpad", innagural 18+yr. old talent-squad building the L2L platform. Fast-track learning and W3 Treasury tooling for SME's|solo-preneurs. Mentoring builder cohorts thru proven curriculum and programming for youth.

Installation Instructions

### Prerequisites

- Python 3.8+
- FastAPI
- Docker (optional)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/DEVBUILDSTACK/DORG.git
   cd DORG
   ```

2. Create a virtual environment and activate it:
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   ```

3. Install the dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the application:
   ```sh
   uvicorn app.main:app --reload
   ```

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
