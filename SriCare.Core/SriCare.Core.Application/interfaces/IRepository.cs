namespace SriCare.Core.Application.Interfaces;

public interface IRepository<T>
    {
        T Create(T entity);
        T Update(T entity);
        Task<T> GetById(object id);
        Task<IList<T>> GetAll();
        Task<bool> Delete(object id);
    }