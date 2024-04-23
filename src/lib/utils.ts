export function dateConverter(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
}

export function showCaption(input : string) {
  const delimiter = '$#0&'
  const index = input.indexOf(delimiter);
  if (index !== -1) {
      return input.substring(0, index);
  }
      return input;
}


export function removeDuplicates<T>(arr: T[]): T[] {
  if(arr){
    return arr.reduce((acc, obj) => {
      const seen = new Set(acc.map(o => JSON.stringify(o)));
      return !seen.has(JSON.stringify(obj)) ? [...acc, obj] : acc;
    }, [] as T[]);
  }
}