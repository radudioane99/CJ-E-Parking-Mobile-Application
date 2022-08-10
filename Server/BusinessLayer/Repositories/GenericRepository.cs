using BusinessLayer.Data;
using BusinessLayer.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>
        where T : class
    {
        public GenericRepository(ApplicationDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        protected ApplicationDbContext DbContext { get; set; }

        public virtual IQueryable<T> Get()
        {
            return this.DbContext.Set<T>();
        }

        public virtual T Get(object key)
        {
            return this.DbContext.Set<T>().Find(key);
        }

        public virtual void Create(T entity)
        {
            this.DbContext.Set<T>().Add(entity);
            this.DbContext.SaveChanges();
        }

        public virtual void Update(T entity)
        {
            this.DbContext.Set<T>().Update(entity);
            this.DbContext.SaveChanges();
        }

        public virtual void Delete(T entity)
        {
            this.DbContext.Set<T>().Remove(entity);
            this.DbContext.SaveChanges();
        }

        public void Add(T entity)
        {
            this.DbContext.Set<T>().Add(entity);
        }

        public void AttachDirty(T entity)
        {
            this.DbContext.Set<T>().Attach(entity);
            this.DbContext.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        public void Remove(T entity)
        {
            this.DbContext.Set<T>().Remove(entity);
        }

        public void SaveChanges()
        {
            this.DbContext.SaveChanges();
        }

        public IEnumerable<T> BulkInsert(IEnumerable<T> entities)
        {
            this.DbContext.Set<T>().AddRange(entities);
            this.DbContext.SaveChanges();

            return entities;
        }
    }
}
