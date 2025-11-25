NPM ?= npm

CMDS := dev build generate preview

.PHONY: $(CMDS) help

help:
	@echo "Usage: make <target>"
	@echo "Targets:"
	@$(foreach cmd,$(CMDS),echo "  $(cmd)";)

$(CMDS):
	$(NPM) run $@
