const progressBar = document.getElementById('progress-bar')
const percentageText = document.getElementById('percentage')
const optionalItemsCheckbox = document.getElementById('optional-items')

function updateProgress(percent) {
    percent = Math.max(0, Math.min(100, percent))

    const roundedPercent = percent.toFixed(2)

    progressBar.style.width = `${roundedPercent}%`
    percentageText.textContent = `${roundedPercent}% done`
}

function updateProgressFromCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox')
    const includeOptional = optionalItemsCheckbox.checked

    let totalCount = 0
    let checkedCount = 0

    checkboxes.forEach(checkbox => {
        if (checkbox.dataset.optional === "false" || (checkbox.dataset.optional === "true" && includeOptional)) {
            totalCount++
            if (checkbox.checked) {
                checkedCount++
            }
        }
    })

    const progressPercent = (totalCount > 0) ? (checkedCount / totalCount) * 100 : 0

    updateProgress(progressPercent)
}

function clearList() {
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach(checkbox => {
        checkbox.checked = false
        toggleRenovations(checkbox)
    })
    updateProgressFromCheckboxes()
    saveState()
}

function toggleRenovations(checkbox) {
    if (!checkbox) return

    const closestH2 = checkbox.closest('h2')
    if (!closestH2) return

    let renovations = closestH2.nextElementSibling

    if (renovations && renovations.classList.contains('renovations')) {
        const renovationCheckboxes = renovations.querySelectorAll('input[type="checkbox"]')

        renovationCheckboxes.forEach(renovation => {
            renovation.disabled = !checkbox.checked
            if (!checkbox.checked) {
                renovation.checked = false
            }
        })
    }
}

function saveState() {
    const checkboxes = document.querySelectorAll('.checkbox')
    const states = Array.from(checkboxes).map((checkbox, index) => ({
        index: index,
        checked: checkbox.checked
    }))

    localStorage.setItem('checkboxStates', JSON.stringify(states))
    localStorage.setItem('includeOptionalItems', optionalItemsCheckbox.checked)
}

function loadState() {
    const savedStates = JSON.parse(localStorage.getItem('checkboxStates'))
    const includeOptionalItems = localStorage.getItem('includeOptionalItems') === 'true'
    const checkboxes = document.querySelectorAll('.checkbox')

    savedStates.forEach(state => {
        const checkbox = checkboxes[state.index]
        if (checkbox) {
            checkbox.checked = state.checked
            toggleRenovations(checkbox)
        }
    })

    optionalItemsCheckbox.checked = includeOptionalItems
    updateProgressFromCheckboxes()
}

document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateProgressFromCheckboxes()
        saveState()
    })
})

document.addEventListener("DOMContentLoaded", () => {
    const logos = document.querySelectorAll('#fclinton')
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateLogo = (e) => {
        logos.forEach(logo => {
            if (e.matches) {
                logo.src = 'images/FClintonLogoLight.png'
            } else {
                logo.src = 'images/FClintonLogoDark.png'
            }
        })
    }

    updateLogo(darkModeMediaQuery)
    darkModeMediaQuery.addEventListener('change', updateLogo)

    loadState()
})

optionalItemsCheckbox.addEventListener('change', () => {
    updateProgressFromCheckboxes()
    saveState()
})

function scrollAndHighlight(elementId) {
    var element = document.getElementById(elementId);

    // Scroll into view
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Highlight and flash the text
    element.classList.add('highlight');
    element.classList.add('flash');

    // Remove highlight and flash after a short duration
    setTimeout(function() {
        element.classList.remove('highlight');
        element.classList.remove('flash');
    }, 4000);
}