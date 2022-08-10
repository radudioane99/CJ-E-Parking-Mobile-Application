using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Interfaces
{
    public interface IGenericRepository<T>
        where T : class
    {
        void Add(T entity);

        void AttachDirty(T entity);

        void Create(T entity);

        IQueryable<T> Get();

        T Get(object key);

        void SaveChanges();

        void Update(T entity);

        void Delete(T entity);

        void Remove(T entity);

        IEnumerable<T> BulkInsert(IEnumerable<T> entities);
    }
}