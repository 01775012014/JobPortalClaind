import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { title: "Retail & Product", jobs: 3 },
  { title: "Content Writer", jobs: 5 },
  { title: "Human Resource", jobs: 2 },
  { title: "Market Research", jobs: 3 },
  { title: "Retail & Product", jobs: 3 },
  { title: "Software", jobs: 1 },
  { title: "Finance", jobs: 3 },
  { title: "Management", jobs: 4 },
  { title: "Marketing & Sale", jobs: 2 },
  { title: "Software", jobs: 1 },
];

export default function BrowseByCategory() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const selectedItems = categories.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <div className="py-12 px-6 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-gray-900">Browse by category</h2>
        <p className="text-gray-500 mt-2">
          Find the job that’s perfect for you. about 800+ new jobs everyday
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {selectedItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl shadow-sm bg-white hover:shadow-md transition cursor-pointer text-center"
            >
              <div className="text-blue-600 text-2xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.jobs} Job{item.jobs > 1 ? "s" : ""} Available
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentPage ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
