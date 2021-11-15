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
        stage('github构建状态通知'){
            steps{
                step([$class: 'GitHubCommitStatusSetter'])
            }
        }
        stage('邮件通知'){
                steps{
                step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: '2296342883 523340889', sendToIndividuals: false])
            }
        }
    }
}