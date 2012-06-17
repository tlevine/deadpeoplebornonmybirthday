from copy import copy

# These should come from the database
MIN_BIRTHDAY = datetime.date(1850, 1, 1)
MAX_BIRTHDAY = datetime.date(2011, 1, 1)

def main(func, wildyears = False, wildmonths = False, wilddays = False):
    _do_range(MIN_BIRTHDAY, MAX_BIRTHDAY)
    if wildyears:
        _do_wild_years(func)
    if wildmonths:
        _do_wild_months(func)
    if wilddays:
        _do_wild_days(func)

def _do_wild_years(func):
    min_birthday = datetime.date(2008, 1, 1)
    max_birthday = datetime.date(2009,12,31)
    _do_range(func, min_birthday, max_birthday)
        
def _do_wild_years(func):
    min_birthday = datetime.date(2008, 1, 1)
    max_birthday = datetime.date(2009,12,31)
    _do_range(func, min_birthday, max_birthday)
        
def _do_range(func, min_birthday, max_birthday):
    'Perform some function for a range of dates.'
    current_birthday = copy(min_birthday)
    while current_birthday < max_birthday:
        current_birthday += time_delta(days=1)
        func(current_birthday)
