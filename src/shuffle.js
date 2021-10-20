const random = (rnd, maxTwrs = 3) => 
    (rnd === 'rnd') 
    ? Math.floor(Math.random() * maxTwrs) 
    : rnd;

export default function shuffleDisks(numD, rnd = 'rnd', maxD = 8) {
    const res = [[],[],[]];
    for (let w = maxD ; w > maxD - numD; w--) 
        res[random(rnd)].push(w);
    return res;
}