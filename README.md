# EDA Platform with NestJS, Kafka, and PostgreSQL

## Overview

This project simulates a server receiving messages from IoT devices using an Event Driven Architecture (EDA). It includes three microservices:

- **iot-gateway**: Handles an API endpoint that receives messages from IoT devices, generates an event in Kafka, and returns an OK response to the devices.
- **database-writer**: An event handler that consumes events from Kafka and writes them to a PostgreSQL database.
- **temperature-monitor**: An event handler that checks if the temperature in the event message is within a safe range.

The project uses Docker Compose for easy setup and deployment, including Kafka Confluent service for message brokering and PostgreSQL for data storage. A separate testing environment utilizes Grafana, InfluxDB, and K6.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Authors](#authors)

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/CamposCaio/kafka-iot-temperature-simulator.git
    cd kafka-iot-temperature-simulator
    ```

2. **Start the services using Docker Compose:**
    ```bash
    docker compose up
    ```

This command will start the Kafka Confluent service, PostgreSQL database, and all microservices (except the tests).

## Usage

After starting the services, interact with the microservices as follows:

- **iot-gateway**: Accessible at `http://localhost:3004/messages`. Send POST requests to this endpoint to simulate IoT device messages. Example body message:
    ```json
    {
        "topic": "temperature",
        "message": {
            "temperature": 50,
            "unit": "C"
        }
    }
    ```
- **database-writer**: Listens for events from Kafka and writes data to PostgreSQL.
- **temperature-monitor**: Listens for events from Kafka and checks if the temperature in the message is safe (less than or equal to 50ºC).

## Testing

1. **Navigate to the test folder:**
    ```bash
    cd test
    ```

2. **Start the test environment using Docker Compose:**
    ```bash
    docker compose up
    ```

This command will start Grafana, InfluxDB, and K6 for performance testing and monitoring.

3. **Access Grafana:**
    - Open your browser and go to `http://localhost:3000`
    - Import the provided dashboards for monitoring.

4. **Run tests with K6:**
    - Edit the K6 test scripts as needed in the `test/scripts/stress-test.js` file.
    - Execute the tests using:
      ```bash
      docker compose run k6 run /scripts/stress-test.js
      ```

## Authors

- [@CamposCaio](https://www.github.com/CamposCaio)
- [@maxwmsilva](https://www.github.com/maxwmsilva)
