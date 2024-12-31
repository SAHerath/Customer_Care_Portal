using Microsoft.EntityFrameworkCore;
using SriCare.Core.Application.Interfaces;

namespace SriCare.Core.Persistence.Repositories;

internal class Repository<T> : IRepository<T> where T : class
    {
        protected readonly CoreDBContext dbContext;
        protected readonly DbSet<T> dbSet;

        public Repository(CoreDBContext dbContext)
        {
            this.dbContext = dbContext;
            dbSet = this.dbContext.Set<T>();
        }

        public T Create(T entity)
        {
            dbContext.Entry(entity).State = EntityState.Added;
            return entity;
        }

        public async virtual Task<bool> Delete(object id)
        {
            T entity = await dbSet.FindAsync(id);
            if (entity == null)
                return false;

            dbSet.Remove(entity);

            return true;
        }

        public async virtual Task<IList<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public async virtual Task<T> GetById(object id)
        {
            return await dbSet.FindAsync(id);
        }

        public T Update(T entity)
        {
            dbContext.Entry(entity).State = EntityState.Modified;
            return entity;
        }
    }