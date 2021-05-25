pipeline {
    agent any 
    tools {nodejs "Nodejs"}
    stages {
        stage('init') { 
            steps {
               
                echo 'init'
            }

        }
         stage('Requirement install') { 
            steps {
               echo 'install requirements'
                sh'npm install -g gatsby-cli'
               
                
              
        
            }
        }

        stage('build checks') { 
            steps {
                   echo 'build checks'
                sh'yarn install'
                sh 'yarn run build '
                 
            }
        }
        stage('Deploy') { 
            steps {
                 
                sh'yarn run deploy' 
       
            }
            }
        }
        
        
    }
