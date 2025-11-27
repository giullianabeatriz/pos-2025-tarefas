function Pagination({ currentPage, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Anterior
      </button>

      <span>Página {currentPage} de {totalPages}</span>

      <button disabled={currentPage === totalPages} onClick={() => onChange(currentPage + 1)}>
        Próximo
      </button>
    </div>
  );
}

export default Pagination;
