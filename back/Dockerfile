FROM python:3.12-slim

# Install Poetry
RUN apt-get update && apt-get install -y curl \
    && curl -sSL https://install.python-poetry.org | python3 -

# Set environment variables for Poetry
ENV PATH /root/.local/bin:$PATH

# Set working directory
WORKDIR /app

# Copy project files
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Command to run the app
CMD ["poetry", "run", "python", "server.py"]
