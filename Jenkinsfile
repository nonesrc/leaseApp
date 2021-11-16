pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '10')
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
                    npm run build
                    cd dist
                    rm -f rantAPP.tar.gz
                    tar -zcvf rantAPP.tar.gz *'''
                }
            }
        }

        stage('发送文件'){
            steps{
                sshPublisher(publishers: [sshPublisherDesc(configName: 'rantServer', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''echo `pwd`
                    cd /www/wwwroot/shop.dreamlongclothes.com
                    tar -zxvf rantAPP.tar.gz
                    rm -f rantAPP.tar.gz ''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: 'shop.dreamlongclothes.com', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/rantAPP.tar.gz')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
            }
        }
        stage('更改remote构建状态'){
            steps{
                step([$class: 'GitHubCommitStatusSetter'])
            }
        }
    }
    post {
        always  {
            emailext subject: '$DEFAULT_SUBJECT',
                body: '$DEFAULT_CONTENT',
                recipientProviders: [
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ], 
                replyTo: '$DEFAULT_REPLYTO',
                to: '$DEFAULT_RECIPIENTS 523340889@qq.com'
        }
    }
}