module.exports = (plageshoraires,dateDebut,dateFin) => {
    // plageshoraires = [
    //     {
    //         jour: "2021-08-01",
    //         heureDebut: "10:00",
    //         heureFin: "12:00"
    //     },
    //     ... 
    // ]
    // dateDebut = "2021-08-01"
    // dateFin = "2021-08-05"

    // On verifie que l'étendue des plages horaires est bien dans les dates du festival et les couvrent entièrement
    for (const plage of plageshoraires) {
        if(plage.jour < dateDebut || plage.jour > dateFin){
            return false;
        }
    }
    return true;

}