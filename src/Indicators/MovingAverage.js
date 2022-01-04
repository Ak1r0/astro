/**
 * La moyenne mobile, ou moyenne glissante, est un type de moyenne statistique utilisée pour analyser
 * des séries ordonnées de données, le plus souvent des séries temporelles,
 * en supprimant les fluctuations transitoires de façon à en souligner les tendances à plus long terme.
 *
 * Cette moyenne est dite mobile parce qu'elle est recalculée de façon continue,
 * en utilisant à chaque calcul un sous-ensemble d'éléments dans lequel un nouvel élément remplace le plus ancien
 * ou s'ajoute au sous-ensemble.
 *
 * @see https://www.botraiders.com/apprendre-bourse/analyser-la-bourse/analyse-technique/moyenne-mobile
 * @see https://fr.wikipedia.org/wiki/Moyenne_mobile
 */
class MovingAverage {

    static mmeRatio = 0.5;

    /**
     * Calcul de la moyenne mobile
     * @param {ItemCollection} items
     *
     * @return {number}
     */
    static arithmetic(items) {
        return items.sum / (items.count > 0 ? items.count : 1);
    }

    /**
     * Calcul de la moyenne pondérée
     * https://www.waldata.fr/indicateurs.asp?name=Moyennes-mobiles-ponderees&Id=44
     *
     * @param {ItemCollection} items
     *
     * @return {number}
     */
    static weighted(items) {
        let sum = 0;
        let cum = 1;
        for(let n = 0; n < items.count; n++){
            sum += items.at[n].value * (n+1);
            cum += n+1;
        }

        return sum / cum;
    }

    /**
     * Calcul de la moyenne mobile exponentielle
     * https://www.ig.com/fr/strategies-de-trading/moyennes-mobiles---comment-les-calculer-et-les-utiliser-dans-vot-210929
     * https://www.journaldunet.fr/patrimoine/guide-des-finances-personnelles/1504253-moyenne-mobile-exponentielle-definition-et-calcul/
     *
     * @param {ItemCollection} items
     *
     * @return {number}
     */
    static exponential(items) {
        let k = 2 / (items.count + 1);

        //items.last.value -

        let mme = 0;
        for(let n = 0; n < items.count; n++){
            mme += k * ( items.at(n).value - mme );
        }

        return mme;
    }
}

module.exports = MovingAverage;