# DORG

DECENSAT.org Agentive SOCIAL iMPACT

## Project Description

DORG SQUADS is a comprehensive solution designed to extend the reach of our content and innovation creator users/clients through a dynamic SOCIALfi website and a future cross-platform mobile application. This project leverages the AssurativeV2 back-end Python and FastApi tech stack to deliver a powerful and scalable platform.

## Code Parrot Ai analysis of D.Org Front-End Interface Mockup
https://docs.google.com/presentation/d/1M06oKj7ZqPgm0_CDyrdz7c5WJKIT0TfHSdM6stk3Gf0/edit#slide=id.g31c19e1d81d_0_479
 
## Installation Instructions

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

For any questions or suggestions, please contact us at [team@decensat.org](mailto:team@decensat.org).
```
