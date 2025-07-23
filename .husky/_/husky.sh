#!/bin/sh
# Internal Husky init file

if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "$@" >&2
  }

  readonly hook_name="$(basename "$0")"
  debug "husky > $hook_name"

  if [ "$HUSKY" = "0" ]; then
    debug "husky > skipping hook (HUSKY=0)"
    exit 0
  fi

  if [ -f ~/.huskyrc ]; then
    debug "husky > sourcing ~/.huskyrc"
    . ~/.huskyrc
  fi
fi
