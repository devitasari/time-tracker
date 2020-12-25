const axios = require('axios')
const fs = require('fs/promises')

const studentData = require(`./student.json`)

const acumulateTime = (repo = '') => {
    const newData = []
    studentData.forEach(student => {
        axios.get(`https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=${student.apiKey}&project=${repo}`)
        .then(res => {
            data = {
                name: student.name,
                time: res.data.data.text
            }
            newData.push(data)
            return fs.writeFile('./result.json', JSON.stringify(newData, null, 2))
        })
        .then(_=> console.log(`${student.name} succes!`))
        .catch(err => console.log(`${student.name} ===> ${err.response.data.error}`))
    })
}


// ========================================

// acumulateTime(<string: repoName>) // jika repoName tidak diisi maka akan merujuk ke total durasi coding all project

acumulateTime('WT')
// =========================================