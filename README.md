
# Three-Tier Web Application: Resume Web App

This is a project for creating an **end-to-end resume web application** using **Django** and **PostgreSQL**. The application is designed to serve as an online resume, providing details about the individual and their work experiences. The project is containerized using **Docker Compose**, deployed on **Kubernetes**, and has integrated **Prometheus** and **Grafana** for observability.

## Technologies Used
- **Backend**: Django (Python)
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, JS
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Monitoring**: Prometheus, Grafana
- **CI/CD**: ArgoCD

## Project Structure

```
├── Dockerfile                    # Dockerfile for the Django app
├── blog                          # Django app handling the blog functionality
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── templates/
│   ├── static/
│   ├── migrations/
│   └── ...
├── custom_kube_prometheus_stack.yml  # Prometheus configuration for Kubernetes
├── deploy                        # Kubernetes deployment configurations
│   ├── django-deployment.yaml
│   ├── django-service.yaml
│   ├── ingress.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
├── docker-compose.yml            # Docker Compose configuration for local setup
├── environ.env                   # Environment variables
├── kube_apply.sh                 # Shell script to apply Kubernetes configurations
├── metallb-config.yaml          # MetalLB configuration for LoadBalancer in Minikube
├── metallb.yaml                  # MetalLB installation YAML
├── manage.py                     # Django management script
├── requirements.txt              # Python dependencies
└── ...
```

## Steps to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/Pshar10/Three-Tier-Web-Application.git
cd Three-Tier-Web-Application
```

### 2. Build and Run with Docker Compose (Local)
To run the application locally using Docker Compose:
```bash
docker-compose up --build
```

### 3. Push Docker Image to Docker Hub
1. Build the Docker image:
    ```bash
    docker build -t yourusername/django-app .
    ```

2. Push the image to Docker Hub:
    ```bash
    docker push yourusername/django-app
    ```

### 4. Kubernetes Setup

1. Set up **Minikube** for Kubernetes:
    ```bash
    minikube start
    ```

2. Apply the Kubernetes configurations:
    ```bash
    kubectl apply -f deploy/
    ```

3. Expose the services using `kubectl`:
    ```bash
    kubectl expose service django-service --type=NodePort --name=django-service
    ```

4. Install and access **Prometheus** for monitoring:
    ```bash
    helm install prometheus prometheus-community/prometheus
    minikube service prometheus-server-ext
    ```

5. Install and access **Grafana** for visualization:
    ```bash
    helm install grafana grafana/grafana
    kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-ext
    minikube service grafana-ext
    ```

## Observability Stack

- **Prometheus** is used for scraping metrics and monitoring the Kubernetes cluster.
- **Grafana** is used for visualizing metrics collected by Prometheus.

### Prometheus:
- Access Prometheus at (example): `http://192.168.49.2:31343` or `http://127.0.0.1:52997`.

### Grafana:
- Access Grafana at (example): `http://192.168.49.2:31379` or `http://127.0.0.1:53149`.

## Deployment Overview

This application is deployed using **Kubernetes** for orchestration, providing scalability and fault tolerance. The deployment is automated through **ArgoCD**, enabling continuous delivery and seamless updates to the environment. **Docker** is used for containerization, allowing for consistent and efficient application packaging across different environments. The **CI/CD** pipeline integrates with **GitHub Actions** for automated builds and deployments. For observability, **Prometheus** is employed to collect metrics, while **Grafana** is used for visualizing those metrics and monitoring the health of the system. This architecture ensures an end-to-end automated workflow, from development to deployment, with real-time monitoring for continuous improvement.

## Environment Variables

Make sure to configure the necessary environment variables before running the app. You can find the required environment settings in the `environ.env` file.

## Contribution

Feel free to fork this repository, make changes, and create pull requests. Any suggestions or improvements are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

