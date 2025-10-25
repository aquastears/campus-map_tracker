# Backend Setup

## Installation

1. Create virtual environment:
```bash
   python3 -m venv venv
   source venv/bin/activate
```

2. Install dependencies:
```bash
   pip install -r requirements.txt
```

3. Configure environment variables in `.env`

4. Run the server:
```bash
   uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000
API documentation at http://localhost:8000/docs
