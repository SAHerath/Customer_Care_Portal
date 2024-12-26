using System.Collections;

namespace Common.Utils.Exceptions;

public class ErrorModel(string code, string description)
{
    public string Code { get; set; } = code;
    public string Description { get; set; } = description;
}

public class ErrorCollection : ICollection<ErrorModel>
{
        private List<ErrorModel> errors = [];

        public int Count => errors.Count;

        public bool IsReadOnly => false;

        public void Add(ErrorModel item)
        {
            errors.Add(item);
        }

        public void Clear()
        {
            errors = [];
        }

        public bool Contains(ErrorModel item)
        {
            return errors.Contains(item);
        }

        public void CopyTo(ErrorModel[] array, int arrayIndex)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerator<ErrorModel> GetEnumerator()
        {
            return errors.GetEnumerator();
        }

        public bool Remove(ErrorModel item)
        {
            return errors.Remove(item);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public List<ErrorModel> GetErrors()
        {
            return errors;
        }
}