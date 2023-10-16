var num = 0

const app = document.getElementById('data')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://www.thebluealliance.com/api/v3/teams/6', true)
request.setRequestHeader('X-TBA-Auth-Key', 'Pl2mLYDebswRLcZxB615g957OUsC05KyrRv8RYGEGXr49muWAmii4I1ww9OqDVxey') // Replace With Your Own API Key
request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
        data.forEach((team_number) => {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = data[num].team_number

            const p1 = document.createElement('p')
            p1.textContent = "Nickname: " + data[num].nickname

            const p2  = document.createElement('p')
            p2.textContent = "Sponsors: " + data[num]["name"]

            const p3 = document.createElement('p')
            if (data[num].website !== null) {
                p3.textContent = "Website: " + data[num].website
            } else {
                p3.textContent = "Website: Unavailable/Not Provided"
            }

            container.appendChild(card)
            card.appendChild(h1)
            card.appendChild(p1)
            card.appendChild(p2)
            card.appendChild(p3)
            num += 1
        })
    } else {
        const errorMessage = document.createElement('marquee')
        errorMessage.textContent = `Gah, it's not working!`
        app.appendChild(errorMessage)
    }
}

request.send()
