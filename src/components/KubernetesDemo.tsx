import React from "react";

const dockerfileSpring = `
FROM openjdk:17-jdk-slim
COPY target/spring-boot-app.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
`;

const deploymentYaml = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-boot-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spring-boot-app
  template:
    metadata:
      labels:
        app: spring-boot-app
    spec:
      containers:
      - name: spring-boot-app
        image: devvsaxena/spring-boot-app:latest
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: spring-boot-service
spec:
  selector:
    app: spring-boot-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: NodePort
`;

const quarkusDockerfile = `
FROM quay.io/quarkus/quarkus-micro-image:2.0
COPY target/quarkus-app /deployments/
`;

export default function KubernetesDemo() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Spring, Quarkus & Microservices on Kubernetes</h1>
      <ol>
        <li>
          <b>Build your microservice (Spring/Quarkus)</b>
          <pre>./mvnw package</pre>
        </li>
        <li>
          <b>Containerize with Docker</b>
          <div>
            <b>Spring Boot Dockerfile:</b>
            <pre>{dockerfileSpring}</pre>
            <b>Quarkus Dockerfile:</b>
            <pre>{quarkusDockerfile}</pre>
          </div>
        </li>
        <li>
          <b>Push to Docker Hub</b>
          <pre>docker push your-dockerhub-username/spring-boot-app:latest</pre>
        </li>
        <li>
          <b>Deploy to Kubernetes</b>
          <pre>{deploymentYaml}</pre>
          <pre>kubectl apply -f spring-deployment.yaml</pre>
        </li>
        <li>
          <b>Check status</b>
          <pre>kubectl get pods,svc</pre>
        </li>
        <li>
          <b>Test the endpoint</b>
          <pre>curl http://localhost:8080/hello</pre>
        </li>
      </ol>
      <p>
        <i>
          Repeat similar steps for Quarkus and other microservices. You can also show a diagram of the architecture.
        </i>
      </p>
    </div>
  );
} 