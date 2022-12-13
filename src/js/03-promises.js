import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
e.preventDefault();
  let amount = Number(e.target.amount.value);
  let delay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  
  for (let position = 1; position <= amount; position += 1) {
    
    createPromise(position, delay)
      .then(({ position, delay }) => {
        // window.alert(`Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // window.alert("no");
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    
    delay += step;
  }
  

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          // Fulfill
          resolve({ position, delay });
        } else {
          // Reject
          reject({ position, delay });
        }
      }, delay);
      return

    });  
      
  }


}


