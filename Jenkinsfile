pipeline {
  agent any

  environment {
    IMAGE_NAME = "gvnaressh/todo-backend"
    IMAGE_TAG = "latest"
  }

  stages {
    stage('Build Docker Image') {
      agent {
        docker {
          image 'node:18'
        }
      }
      steps {
        dir('backend') {
          sh 'npm install'
          sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh "docker push $IMAGE_NAME:$IMAGE_TAG"
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/backend-deployment.yaml'
      }
    }
  }
}
