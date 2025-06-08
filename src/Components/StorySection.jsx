const StorySection = () => {
  return (
    <section className="text-gray-600 body-font px-3 py-3">
      <div className="container px-5 py-18 mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Text Content */}
        <div className="lg:w-1/2 w-full">
          <h1 className="title-font font-bold text-3xl text-gray-900 mb-4">
            Our Story
          </h1>
          <p className="leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a wide
            range of tailored marketing, data, and service solutions, Exclusive has
            10,500 sellers and 300 brands, serving 3 million customers across the
            region.
          </p>
          <p className="leading-relaxed">
            Exclusive has more than 1 million products to offer and is growing
            rapidly. It offers a diverse assortment in categories ranging from
            consumer electronics to lifestyle products.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <img
            className="rounded-md w-full h-auto object-cover"
            src="https://image.gala.de/22183258/t/zR/v7/w1440/r1.5/-/teaser-gala-xmas-shopping.jpg"
            alt="Our story"
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
