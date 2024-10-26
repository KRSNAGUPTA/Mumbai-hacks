import React, { useState } from 'react';
import { FileText, Search, ChevronLeft, ChevronRight, SortAsc, Filter } from 'lucide-react';

// Simulated case document data
const caseDocuments = Array(50).fill(null).map((_, i) => ({
  id: i + 1,
  title: `Case Study ${i + 1}`,
  description: `This is a brief description of Case Study ${i + 1}. It contains important information about the case.`,
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
  category: ['Legal', 'Medical', 'Financial', 'Technical'][Math.floor(Math.random() * 4)]
}));

const Button = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-black rounded-full text-white  hover:bg-gray-800 disabled:bg-gray-300 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`border rounded px-3 py-2 ${className}`}
  />
);

const Select = ({ value, onChange, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="border rounded px-3 py-2"
  >
    {children}
  </select>
);

const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export default function CaseDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [filterCategory, setFilterCategory] = useState('All');
  const itemsPerPage = 9;

  const filteredDocuments = caseDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === 'All' || doc.category === filterCategory)
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedDocuments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Case Documents</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <div className="flex space-x-4">
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
              </Select>
              <Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Legal">Legal</option>
                <option value="Medical">Medical</option>
                <option value="Financial">Financial</option>
                <option value="Technical">Technical</option>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((doc) => (
              <Card key={doc.id} className="flex flex-col justify-between">
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                  <p className="text-sm text-gray-500">{doc.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{doc.date}</span>
                    <span className="text-sm font-medium text-blue-600">{doc.category}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50">
                  <Button className="w-full flex items-center justify-center">
                    <FileText className="mr-2" size={20} />
                    View Case
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-36"
            >
        
              &lt; Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-36"
            >
              Next &gt;
              
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}