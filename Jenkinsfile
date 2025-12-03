pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "gvnaressh/todo-backend"
        FRONTEND_IMAGE = "gvnaressh/todo-frontend"
        VERSION = "v1.0.${BUILD_NUMBER}"
    }

    triggers {
        githubPush()     // Auto-trigger on GitHub push
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/narresh369/todos.git'
            }
        }

        stage('Build Backend Docker') {
            steps {
                dir('backend') {
                    sh "docker build -t $BACKEND_IMAGE:$VERSION -t $BACKEND_IMAGE:latest ."
                }
            }
        }

        stage('Build Frontend Docker') {
            steps {
                dir('frontend') {
                    sh "docker build -t $FRONTEND_IMAGE:$VERSION -t $FRONTEND_IMAGE:latest ."
                }
            }
        }

        stage('Docker Login & Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh "docker push $BACKEND_IMAGE:$VERSION"
                    sh "docker push $BACKEND_IMAGE:latest"
                    sh "docker push $FRONTEND_IMAGE:$VERSION"
                    sh "docker push $FRONTEND_IMAGE:latest"
                }
            }
        }

        stage('Deploy Backend to Kubernetes') {
            steps {
                sh "kubectl apply -f k8s/backend-deployment.yaml"
            }
        }

        stage('Deploy Frontend to Vercel') {
            steps {
                withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
                    dir('frontend') {
                        sh """
                        npm install -g vercel
                        vercel deploy --prod --token=$VERCEL_TOKEN --yes
                        """
                    }
                }
            }
        }
    }
}
