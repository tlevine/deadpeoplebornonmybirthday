from copy import copy

# These should come from the database
MIN_BIRTHDAY = datetime.date(1850, 1, 1)
MAX_BIRTHDAY = datetime.date(2011, 1, 1)

def main(func, wildyears = False, wilddays = False):

def _do_wild_day_of_month(func, year, month,
        mock_query_result = None):
    min_birthday = datetime.date(year, month, 1)
    max_birthday = min_birthday + timedelta(months = 1) - timedelta(days = 1)
    _do_range(func, min_birthday, max_birthday)
        
def _do_wild_year(func, mock_query_result = None):
    min_birthday = datetime.date(2008, 1, 1)
    max_birthday = datetime.date(2009,12,31)
    results_raw = _do_range(func, min_birthday, max_birthday)
    # Convert to wildcard results
    return results_wild
        
def _do_range(func,
        min_birthday, max_birthday,
        mock_query_result = None):
    'Perform some function, reporting a list of results bay date.'
    current_birthday = copy(min_birthday)
    while current_birthday < max_birthday:
        current_birthday += time_delta(days=1)
        if mock_query_result != None:
            people = mock_query_result
        else:
            # Select all people within the birthdate, then
        return func(people)
