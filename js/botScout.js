let botForm = document.getElementById("form")

const app = document.getElementById("data")

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var cardUp = false

function accessAPI(team) {
    let formattedURL = "https://www.thebluealliance.com/api/v3/team/frc" + team;

    var request = new XMLHttpRequest()
    request.open('GET', formattedURL, true)
    request.setRequestHeader('X-TBA-Auth-Key', 'Pl2mLYDebswRLcZxB615g957OUsC05KyrRv8RYGEGXr49muWAmii4I1ww9OqDVxe')
    request.onload = function () {
        var dataJSON = JSON.parse(this.response)

        let card = document.createElement('div')
        card.setAttribute('class', 'card')

        let cardBody = document.createElement('div')
        cardBody.setAttribute('class', 'card-body')

        let title = document.createElement('h5')
        title.setAttribute('class', 'card-title')
        if (dataJSON['nickname'] != null) {
            title.textContent = dataJSON['nickname']
        } else {
            title.textContent = dataJSON['team_number']
        }

        let p1 = document.createElement('p')
        p1.setAttribute('class', 'card-text')
        p1.textContent = dataJSON['city'] + ', ' + dataJSON['state_prov'] + ' ' + dataJSON['country']

        let p2 = document.createElement('p')
        p2.setAttribute('class', 'card-text')
        p2.textContent = 'Sponsors: ' + dataJSON['name']

        let p3 = document.createElement('p')
        p3.setAttribute('class', 'card-text')
        p3.textContent = 'Rookie Year: ' + dataJSON['rookie_year']

        let p4 = document.createElement('p')
        p4.setAttribute('class', 'card-text')
        p4.textContent = 'School: ' + dataJSON['school_name']

        let p5 = document.createElement('p')
        let formattedLink = 'https://www.thebluealliance.com/team/' + team
        p5.setAttribute('class', 'card-text')
        p5.textContent = 'Link: '
        let link = document.createElement('a')
        link.setAttribute('href', formattedLink)
        link.textContent = formattedLink
        p5.appendChild(link)

        app.appendChild(card)
        card.appendChild(cardBody)
        cardBody.appendChild(title)
        cardBody.appendChild(p1)
        cardBody.appendChild(p2)
        cardBody.appendChild(p3)
        cardBody.appendChild(p4)
        cardBody.appendChild(p5)

        cardUp = true
    }
    request.send()
}

botForm.addEventListener("submit", (e) => {
    e.preventDefault()

    var teamNum = document.getElementById("teamNumber")
    var eventCode = document.getElementById("eventCode")

    accessAPI(teamNum.value);
})