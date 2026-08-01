

function GetCurrentPage(urlName){
    switch(urlName) {
        case '/signin':
            return 'Sign In'
        case '/signup':
            return 'Sign Up'
        case '/account':
            return 'Account'
        case '/myteams':
            return 'My teams'
        default:
            return 'Pokédex'
    }

}

export default GetCurrentPage;