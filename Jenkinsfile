pipeline {
    agent any
    environment {
        GIT_CREDS = credentials('GIT_TOKEN')
    }
    stages {
        stage('gather data') {
            steps {
                sh 'rm -r modules'
                sh 'python3 ./module-generation/scrape.py'
                sh 'python3 ./module-generation/frontmatter.py'
            }
        }
        stage('Check Data') {
            steps {
                script {
                    try {
                        sh 'bash ./module-generation/loadModules.sh'
                    } catch (err) {
                        println("$err")
                    }
                }
            }
        }
        stage('clean workspace') {
            steps {
                cleanWs()
            }
        }
    }
}
