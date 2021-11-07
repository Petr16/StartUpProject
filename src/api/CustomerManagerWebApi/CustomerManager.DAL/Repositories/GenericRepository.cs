using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CustomerManager.DAL.Repositories.Interfaces;

namespace CustomerManager.DAL.Repositories
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        protected readonly DbContext _context;

        public DbSet<TEntity> DbSet { get; }


        public GenericRepository(DbContext context)
        {
            _context = context;
            DbSet = _context.Set<TEntity>();
        }


        public Task<int> CountAsync(CancellationToken cancellationToken = default)
        {
            return DbSet.CountAsync(cancellationToken);
        }

        public Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return DbSet.CountAsync(predicate, cancellationToken);
        }


        #region Get

        public IQueryable<TEntity> GetAll()
        {
            return DbSet;
        }

        public IEnumerable<TEntity> GetAllAsEnumerable(bool asNoTracking = true)
        {
            IQueryable<TEntity> smth = asNoTracking ? DbSet.AsNoTracking() : DbSet;
            return smth.AsEnumerable();
        }

        public async Task<List<TEntity>> GetAllToListAsync(bool asNoTracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<TEntity> smth = asNoTracking ? DbSet.AsNoTracking() : DbSet;
            return await smth.ToListAsync(cancellationToken);
        }

        public IQueryable<TEntity> GetWhere(Expression<Func<TEntity, bool>> predicate)
        {
            return DbSet.Where(predicate);
        }

        public Task<TEntity> FirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken = default)
        {
            return DbSet.FirstOrDefaultAsync(predicate, cancellationToken);
        }

        public ValueTask<TEntity> GetByIdAsync(params object[] keyValues)
        {
            return DbSet.FindAsync(keyValues);
        }

        public ValueTask<TEntity> GetByIdAsync(object[] keyValues, CancellationToken cancellationToken = default)
        {
            return DbSet.FindAsync(keyValues, cancellationToken);
        }

        #endregion


        public async Task<TEntity> AddAsync(TEntity entity)
        {
            await DbSet.AddAsync(entity);
            return entity;
        }

        public TEntity Update(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                DbSet.Attach(entity);

            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public void Remove(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
                DbSet.Attach(entity);

            DbSet.Remove(entity);
        }

        public async Task RemoveByIdAsync(params object[] keyValues)
        {
            TEntity entityToRemove = await DbSet.FindAsync(keyValues);
            if (entityToRemove != null)
                DbSet.Remove(entityToRemove);
        }

        public void RemoveRange(IEnumerable<TEntity> entities)
        {
            IEnumerable<TEntity> entityList = entities as IList<TEntity> ?? entities.ToList();
            foreach (var entity in entityList.Where(e => _context.Entry(e).State == EntityState.Detached))
                DbSet.Attach(entity);

            DbSet.RemoveRange(entityList);
        }
    }

}
