using System;
using System.Text.Json;

namespace Common.Utils.Exceptions;

public class CustomValidationException : Exception
{
    public CustomValidationException(ErrorCollection errorCollection)
              : base(JsonSerializer.Serialize(errorCollection.GetErrors()))
    {
    }

    public CustomValidationException(ErrorModel error)
             : base(JsonSerializer.Serialize(error))
    {
    }
}