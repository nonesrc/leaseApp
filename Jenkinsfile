@NonCPS
def getChangeString() {
    MAX_MSG_LEN = 100
    def changeString = ""

    echo "Gathering SCM changes"
    def changeLogSets = currentBuild.rawBuild.changeSets
    for (int i = 0; i < changeLogSets.size(); i++) {
        def entries = changeLogSets[i].items
        for (int j = 0; j < entries.length; j++) {
            def entry = entries[j]
            truncated_msg = entry.msg.take(MAX_MSG_LEN)
            changeString += " - ${truncated_msg} [${entry.author}]\n"
        }
    }

    if (!changeString) {
        changeString = " - No new changes"
    }
    return changeString
}

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
                step([$class: 'GitHubCommitStatusSetter', statusResultSource : [$class: 'DefaultStatusResultSource']])
                nodejs('node16.13.0') {
                    sh '''npm install
                    npm run build
                    cd dist
                    rm -f rantAPP.tar.gz
                    tar -zcvf rantAPP.tar.gz *'''
                }
            }
        }
    }

    post {
        always  {
            step([$class: 'GitHubCommitStatusSetter', statusResultSource : [$class: 'DefaultStatusResultSource']])
            withCredentials([string(credentialsId: 'ad123e97-743e-4183-8b7c-7dee66df4fcb', variable: 'QQ_Notify_API'), string(credentialsId: '4f813789-0a79-486f-830c-3ce4c5a63a9c', variable: 'QQ_Notify_Token')]) {
                sh '''curl -H "Content-Type: application/json" -X POST  --data '{"token":"'''+QQ_Notify_Token+'''","JOB_NAME":"'''+currentBuild.fullDisplayName+'''","BUILD_NUMBER":"'''+BUILD_NUMBER+'''","BUILD_STATUS":"'''+currentBuild.result+'''","PROJECT_NAME":"'''+JOB_NAME+'''","CAUSE":"'''+currentBuild.getBuildCauses()+'''","CHANGE_URL":"'''+currentBuild.absoluteUrl+'''changes","BUILD_URL":"'''+BUILD_URL+'''","DURATION":"'''+currentBuild.duration+'''","CHANGE_SETS":"'''+getChangeString()+'''","JOB_DISPLAY_URL":"'''+JOB_DISPLAY_URL+'''","RUN_DISPLAY_URL":"'''+RUN_DISPLAY_URL+'''"}' '''+QQ_Notify_API
            }
        }
        
        failure  {
                emailext subject: '$DEFAULT_SUBJECT',
                    body: '$DEFAULT_CONTENT',
                    recipientProviders: [
                        [$class: 'CulpritsRecipientProvider'],
                        [$class: 'DevelopersRecipientProvider'],
                        [$class: 'RequesterRecipientProvider']
                    ], 
                    replyTo: '$DEFAULT_REPLYTO',
                    to: '$DEFAULT_RECIPIENTS'
        }
    }
}

