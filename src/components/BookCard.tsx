import React from 'react';
import { motion } from 'motion/react';
import { Book } from '../booksData';
import { Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  isWishlisted?: boolean;
  onToggleWishlist?: (e: React.MouseEvent, id: string) => void;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isWishlisted = false, onToggleWishlist, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onClick(book)}
      className="bg-white cursor-pointer flex flex-col h-full font-sans group"
    >
      {/* Book Cover Container - Light Gray Background */}
      <div className="w-full aspect-[2/3] bg-[#F9FAFB] flex items-center justify-center p-4 sm:p-6 mb-4 relative transition-colors group-hover:bg-[#F3F4F6]">
        <img
          src={book.cover_url || book.image}
          alt={book.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Heart Icon Badge (Optional) */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(e, book.id);
            }}
            className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 transition-colors z-20 opacity-0 group-hover:opacity-100"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-grow px-1">
        {/* Format - Red/Coral colour matching the design */}
        <span className="text-[10px] sm:text-[11px] font-bold text-[#F87171] uppercase tracking-wider mb-1 block truncate">
          {book.format || 'DIGITAL EBOOK'}
        </span>
        
        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-[#111827] leading-snug mb-1 line-clamp-2">
          {book.title}
        </h3>
        
        {/* Author */}
        <p className="text-[11px] sm:text-xs text-slate-500 mb-2 font-medium truncate">
          {book.author}
        </p>

        {/* Pricing */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-[#111827] font-bold text-sm sm:text-base">
            ₹{book.price}
          </span>
          {(book.originalPrice && book.originalPrice > book.price) && (
            <span className="text-[11px] sm:text-xs text-slate-400 line-through font-medium">
              ₹{book.originalPrice}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
export default BookCard;
