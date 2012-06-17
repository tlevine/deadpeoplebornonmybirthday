from jinja2 import Template
from settings

template = Template(open('templates/birthday.html'))
birthdays = ['1990-03-25', '1990-03-26', '1990-03-27', '1990-03-28, '1990-03-29, '1990-03-30', '1990-03-31', '1990-04-01']

def main():
    render(birthday = settings.MIN_BIRTHDAY, has_next = True, has_prev = False)
    render(birthday = settings.MAX_BIRTHDAY, has_next = True, has_prev = True)

    current_birthday = copy(settings.MIN_BIRTHDAY)
    max_birthday = settings.MIN_BIRTHDAY = timedelta(days=1)
    while current_birthday < max_birthday: 
        current_birthday += timedelta(days = 1)
        render(birthday = current_birthday, has_next = False, has_prev = True)

def render(birthday, **kwargs):
    kwargs.update(settings.ENV_VARS)
    f = open('publish/%s.html' % birthday, 'w')
    f.write(template.render(birthday = birthday, **kwargs))
    f.close()
