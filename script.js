$(document).ready(function() {

  $('.slider').slick({
    infinite: false,
	  slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '.btns__right-arrow',
	  prevArrow: '.btns__left-arrow',
    dots: false,
    fade: true,
    cssEase: 'linear',
  });

  const createBlog = (url, title) => {
    let img
    if(title.includes('Instagram') || title.includes('instagram')) {
      img = "image/desktop/news1.png"
    } else if (title.includes('Combin')) {
        img = "image/desktop/news3.png"
    }
    let blog = `<a class="news__item" href="${url}" target="_blank">
                  <div class="news-item__img-wrapper">
                    <img class="news-item__img" src=${img} width="440" height="350" alt="">
                  </div>
                  <div class="news-item__text-wrapper">
                    <div class="news-item__text">${title}</div>
                  </div>  
                </a>`          
    return blog            
  };
  
  const renderBlog = blogs => {
    blogs.forEach(({url, title}) => {
      $('.posts__news').append(createBlog(url, title))
    });
  };

  const filterBlog = blogs => {
    blogs.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);

      return dateB - dateA
    });
    return blogs
  };

  const getBlogs = (filter, handler) => {
    fetch("blog_posts.json")
    .then(response => response.json())
    .then(data => data)
    .then(filter)
    .then(handler);
  };

  const createSliderItem = (name, instagram_username, text) => {
    let sliderItem = `<div class="slider-item-wrapper">
                        <div class="slider__item">

                          <div class="sl-item__content">
                            <div class="sl-item__text">${text}</div>
                            <a class="sl-item__user" href="https://www.instagram.com/${instagram_username}" target="_blank">
                              <p class="sl-item__name">${name},</p>
                              <p class="sl-item__instagram">${instagram_username}</p>
                            </a>
                          </div>

                          <div class="sl-item__extra">
                            <div class="sl-item__photo">
                              <div class="photo__bg">
                              </div>
                            </div>
                            <div class="sl-item__btns">
                              <button class="btns__left-arrow">
                                <img src="Path-2.svg">
                              </button>
                              <button class="btns__right-arrow">
                                <img src="Path-2.svg">
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>`
    return sliderItem                  
  };

  const renderSliderItem = feedback => {
    feedback.forEach(({name, instagram_username, text}) => {
      $('.slider').slick('slickAdd', createSliderItem(name, instagram_username, text))
    });
  };

  $(".loading-posts-a").on('click', function(ev) {
    ev.preventDefault();
    $('.loading-posts').fadeOut(200);
    getBlogs(filterBlog, renderBlog);
    $(".posts").css('margin-bottom', '60px');
  });
  
  fetch("feedback_data.json")
  .then(response => response.json())
  .then(data => data)
  .then(renderSliderItem)

});