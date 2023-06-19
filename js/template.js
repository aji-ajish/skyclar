var TEMPLATE = {
  thanks: {
    banner: function (ob) {
      return `
      <div class="bgWrap thankyou">
        <section class="midTitle thankyou">
          <div class="container">
            <div class="row">
              <div class="col-lg-16 offset-lg-2 ">
                <h1 class="h1">${ob.title}</h1>
                <p class="details">${ob.details}</p>
              </div>
            </div>
          </div>
          <div class="shapeCrop angle-right-top"></div>
        </section>
      </div>
      `;
    },
    // cards_RaR: function (ob) {
    //   return `
    //   <section class="contentSection thankyou">
    //   <div class="container">
    //     <div class="row">
    //       <div class="col-lg-10 offset-lg-2">
    //         <div class="card">
    //           <div class="headline">
    //             Learn how SKYCLARYS slowed FA disease progression
    //           </div>
    //           <a href="${ob.page.efficacy}" class="btn btn-lg btn-accent w-100">
    //             <span>SKYCLARYS efficacy</span>
    //           </a>
    //         </div>
    //       </div>
    //       <div class="col-lg-10">
    //         <div class="card">
    //           <div class="headline">
    //             Explore SKYCLARYS and community support
    //           </div>
    //           <a href="${ob.page.resource}" class="btn btn-lg btn-accent w-100">
    //             <span>Find resources</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    //   `;
    // },
    cards: function (ob) {
      return `
      <section class="btnWrap">
        <div class="container">
          <div class="row">
            <div class="${ob.data[0].classParent} ">
              <div class="btnCard">
                <div class="row">
                  <div class=" ${ob.data[0].classChild} cardDiv">
                    <div class="card borderCard ">
                      <div class="cardHeader">
                        ${ob.data[0].text}
                      </div>
                      <div class="cardContent">
                        <a href="${ob.data[0].link}" class="btn btn-lg btn-accent w-100">
                          <span>${ob.data[0].cta}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class=" ${ob.data[1].classChild} cardDiv">
                    <div class="card borderCard ">
                      <div class="cardHeader">
                        ${ob.data[1].text}
                      </div>
                      <div class="cardContent">
                        <a href="${ob.data[1].link}" class="btn btn-lg btn-accent w-100">
                          <span>${ob.data[1].cta}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      `;
    }
  }
};