pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    stages {
        stage('检查仓库') {
            steps {
                git branch: 'dev', credentialsId: 'bec34d29-6cf2-408d-8ed1-cf279cf6f5aa', url: 'git@github.com:nonesrc/rentApp.git'
            }
        }
        stage('构建') {
            steps {
                nodejs('node16.13.0') {
                    sh '''npm install
                        npm run build'''
                }
            }
        }
    }
}