pipeline {
  agent any

  environment {
    IMAGE_NAME = 'gvnaressh/todo-backend'
    IMAGE_TAG = 'latest'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/narresh369/todos.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        dir('backend') {
          sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Assumes your YAML files are in /k8s and properly configured
          sh 'kubectl apply -f k8s/postgres-deployment.yaml'
          sh 'kubectl apply -f k8s/postgres-pvc.yaml'
          sh 'kubectl apply -f k8s/backend-deployment.yaml'
        }
      }
    }
  }
}
