export const levenshtainDistance = (firstWord: string, lastWord: string) => {
  if(firstWord == lastWord) return 0
  let res = 0, previousResults: number[] = []
  for(let a=0; a<firstWord.length; a++){
    let lefth = a+2, up = 0, right = 0, results = []
    for(let b=0; b<lastWord.length; b++){
      right = previousResults[b]==undefined ? b+2 : previousResults[b]+1

      if (b==0) {
        up = (firstWord[a] == lastWord[b] ? (a==b ? 0 : a) : a+1)
      }else{
        up = (firstWord[a] == lastWord[b] ? (previousResults[b-1]==undefined ? b : previousResults[b-1]) : (a==0 ? b+1 : previousResults[b-1]+1 ))
      }    
      
      res = Math.min(right, lefth, up)
      
      results[b] = res
      lefth = res+1
      
      if(b+1 == lastWord.length) previousResults = results
    }
  }
  return res
}